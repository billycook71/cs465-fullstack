/* GET rooms view */
const contact = (req, res) => {
    res.render('contact', {title: 'Travlr Contact'});
};

module.exports = {
    contact
};