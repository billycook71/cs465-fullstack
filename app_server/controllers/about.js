/* GET rooms view */
const about = (req, res) => {
    res.render('about', {title: 'Travlr About'});
};

module.exports = {
    about
};