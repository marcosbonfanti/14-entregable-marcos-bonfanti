"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _index = _interopRequireDefault(require("../routes/index.js"));

var http = _interopRequireWildcard(require("http"));

var _socket = require("./socket");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const myHTTPServer = http.Server(app);

_socket.socketService.initWsService(myHTTPServer);
/** DISPONIBILIZAR CARPETA PUBLIC */


const publicFolder = _path.default.resolve(__dirname, '../../public');

app.use(_express.default.static(publicFolder));
/** HBS SETTINGS */

const layoutFolderPath = _path.default.resolve(__dirname, '../../views/layouts');

const defaultLayerPath = _path.default.resolve(__dirname, '../../views/layouts/index.hbs');

const partialFolderPath = _path.default.resolve(__dirname, '../../views/partial');

app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars.default)({
  layoutsDir: layoutFolderPath,
  partialsDir: partialFolderPath,
  defaultLayout: defaultLayerPath,
  extname: 'hbs'
}));
app.use(_express.default.json());
app.use('/api', _index.default);
app.get('/', (req, res) => {
  const datos = [];
  res.render('main', datos);
});
var _default = myHTTPServer;
exports.default = _default;
