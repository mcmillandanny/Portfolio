'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fragments = require('@tools/fragments');

var _perlin = require('./perlin.frag');

var _perlin2 = _interopRequireDefault(_perlin);

var _gorday = require('./gorday.frag');

var _gorday2 = _interopRequireDefault(_gorday);

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* GordayFilter, {@link https://codepen.io/alaingalvan originally} by Alain Galvan
*
*
*
* ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/godray.gif)
* @class
* @extends PIXI.Filter
* @memberof PIXI.filters
*
* @example
*  displayObject.filters = [new GodrayFilter()];
* @param {object} [options] Filter options
* @param {number} [options.angle=30] Angle/Light-source of the rays.
* @param {number} [options.gain=0.5] General intensity of the effect.
* @param {number} [options.lacunrity=2.5] The density of the fractal noise.
* @param {boolean} [options.parallel=true] `true` to use `angle`, `false` to use `center`
* @param {number} [options.time=0] The current time position.
* @param {PIXI.Point|number[]} [options.center=[0,0]] Focal point for non-parallel rays,
*        to use this `parallel` must be set to `false`.
*/
var GodrayFilter = function (_PIXI$Filter) {
    _inherits(GodrayFilter, _PIXI$Filter);

    function GodrayFilter(options) {
        _classCallCheck(this, GodrayFilter);

        var _this = _possibleConstructorReturn(this, (GodrayFilter.__proto__ || Object.getPrototypeOf(GodrayFilter)).call(this, _fragments.vertex, _gorday2.default.replace('${perlin}', _perlin2.default)));

        _this.uniforms.dimensions = new Float32Array(2);

        // Fallback support for ctor: (angle, gain, lacunarity, time)
        if (typeof options === 'number') {
            // eslint-disable-next-line no-console
            console.warn('GodrayFilter now uses options instead of (angle, gain, lacunarity, time)');
            options = { angle: options };
            if (arguments[1] !== undefined) {
                options.gain = arguments[1];
            }
            if (arguments[2] !== undefined) {
                options.lacunarity = arguments[2];
            }
            if (arguments[3] !== undefined) {
                options.time = arguments[3];
            }
        }

        options = Object.assign({
            angle: 30,
            gain: 0.5,
            lacunarity: 2.5,
            time: 0,
            parallel: true,
            center: [0, 0]
        }, options);

        _this._angleLight = new PIXI.Point();
        _this.angle = options.angle;
        _this.gain = options.gain;
        _this.lacunarity = options.lacunarity;

        /**
         * `true` if light rays are parallel (uses angle),
         * `false` to use the focal `center` point
         *
         * @member {boolean}
         * @default true
         */
        _this.parallel = options.parallel;

        /**
         * The position of the emitting point for light rays
         * only used if `parallel` is set to `false`.
         *
         * @member {PIXI.Point|number[]}
         * @default [0, 0]
         */
        _this.center = options.center;

        /**
         * The current time.
         *
         * @member {number}
         * @default 0
         */
        _this.time = options.time;
        return _this;
    }

    /**
     * Applies the filter.
     * @private
     * @param {PIXI.FilterManager} filterManager - The manager.
     * @param {PIXI.RenderTarget} input - The input target.
     * @param {PIXI.RenderTarget} output - The output target.
     */


    _createClass(GodrayFilter, [{
        key: 'apply',
        value: function apply(filterManager, input, output, clear) {
            var _input$sourceFrame = input.sourceFrame,
                width = _input$sourceFrame.width,
                height = _input$sourceFrame.height;


            this.uniforms.light = this.parallel ? this._angleLight : this.center;

            this.uniforms.parallel = this.parallel;
            this.uniforms.dimensions[0] = width;
            this.uniforms.dimensions[1] = height;
            this.uniforms.aspect = height / width;
            this.uniforms.time = this.time;

            // draw the filter...
            filterManager.applyFilter(this, input, output, clear);
        }

        /**
         * The angle/light-source of the rays in degrees. For instance, a value of 0 is vertical rays,
         *     values of 90 or -90 produce horizontal rays.
         * @member {number}
         * @default 30
         */

    }, {
        key: 'angle',
        get: function get() {
            return this._angle;
        },
        set: function set(value) {
            this._angle = value;

            var radians = value * PIXI.DEG_TO_RAD;

            this._angleLight.x = Math.cos(radians);
            this._angleLight.y = Math.sin(radians);
        }

        /**
         * General intensity of the effect. A value closer to 1 will produce a more intense effect,
         * where a value closer to 0 will produce a subtler effect.
         *
         * @member {number}
         * @default 0.5
         */

    }, {
        key: 'gain',
        get: function get() {
            return this.uniforms.gain;
        },
        set: function set(value) {
            this.uniforms.gain = value;
        }

        /**
         * The density of the fractal noise. A higher amount produces more rays and a smaller amound
         * produces fewer waves.
         *
         * @member {number}
         * @default 2.5
         */

    }, {
        key: 'lacunarity',
        get: function get() {
            return this.uniforms.lacunarity;
        },
        set: function set(value) {
            this.uniforms.lacunarity = value;
        }
    }]);

    return GodrayFilter;
}(PIXI.Filter);

exports.default = GodrayFilter;
//# sourceMappingURL=GodrayFilter.js.map
