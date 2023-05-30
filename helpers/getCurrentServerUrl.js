function getCurrentServerUrl (req) {
    const protokol = req.protokol;
    const host = req.get('host');
    const serverUrl = ` ${req.protocol}://${req.get('host')}`;

    return serverUrl;
};

module.exports = getCurrentServerUrl;