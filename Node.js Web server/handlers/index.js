const homePageHandler = require('./home')
const filesHandler = require('./static-files')
const imageUploadHandler = require('./image-upload')
const statusHeaderHandler = require('./status-header')
const detailsPageHandler = require('./details-page')
const allImagesHandler = require('./all-images')


module.exports = [statusHeaderHandler, allImagesHandler, detailsPageHandler, homePageHandler, imageUploadHandler, filesHandler ]