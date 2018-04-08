module.exports = function ( app ) {
    require('./login')(app);
    require('./homepage')(app);
    require('./detail')(app);
};
