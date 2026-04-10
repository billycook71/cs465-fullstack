require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("./app_api/models/travlr");
const User = require("./app_api/models/user");
const Trip = mongoose.model("trips");

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_NAME = "travlr";
const DB_URI = `mongodb://${DB_HOST}/${DB_NAME}`;

const shouldReset = process.argv.includes("--reset");

const demoUser = {
  name: "Demo Admin",
  email: "admin@example.com",
  password: "Password123!",
};

function loadTripsFromJson() {
  const tripsPath = path.join(__dirname, "data", "trips.json");
  const raw = fs.readFileSync(tripsPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("data/trips.json must contain an array of trip objects.");
  }

  return parsed;
}

async function connectToDatabase() {
  await mongoose.connect(DB_URI);
  console.log(`Connected to ${DB_URI}`);
}

async function clearCollections() {
  await User.deleteMany({});
  await Trip.deleteMany({});
  console.log("Existing users and trips removed.");
}

async function databaseHasData() {
  const [userCount, tripCount] = await Promise.all([
    User.countDocuments(),
    Trip.countDocuments(),
  ]);

  return userCount > 0 || tripCount > 0;
}

async function seedUser() {
  const existingUser = await User.findOne({ email: demoUser.email });

  if (existingUser) {
    console.log(`Demo user already exists: ${demoUser.email}`);
    return existingUser;
  }

  const user = new User({
    name: demoUser.name,
    email: demoUser.email,
  });

  user.setPassword(demoUser.password);
  await user.save();

  console.log(`Demo user created: ${demoUser.email}`);
  return user;
}

async function seedTrips() {
  const trips = loadTripsFromJson();

  if (shouldReset) {
    await Trip.deleteMany({});
  }

  await Trip.insertMany(trips);
  console.log(`${trips.length} trips inserted from data/trips.json.`);
}

async function runSeed() {
  try {
    await connectToDatabase();

    if (!shouldReset) {
      const hasData = await databaseHasData();

      if (hasData) {
        console.log(
          "Database already contains data. Run `npm run seed -- --reset` to clear and reseed."
        );
        return;
      }
    } else {
      await clearCollections();
    }

    await seedUser();
    await seedTrips();

    console.log("\nSeed complete.");
    console.log("Demo login:");
    console.log(`  Email: ${demoUser.email}`);
    console.log(`  Password: ${demoUser.password}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

runSeed();