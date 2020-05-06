(function () {

    var context = null,
        audio = null,

        filters = [],

        $ = document.querySelector.bind(document),
        createContext = function () {
            context = new (window.AudioContext || window.webkitAudioContext)();
        },
        /**
         * creates number input elements
         */
        createInputs = function (className, container, number) {
            var inputs = [],
                node,
                i;

            for (i = 0; i < number; i++) {
                node = document.createElement('input');
                node.className = className;
                container.appendChild(node);
                inputs.push(node);
            }

            return inputs;
        },

        /**
         * check param
         */
        validateParam = function (param) {
            if (!param) {
                throw new TypeError('error equalizer must have audio and input container params');
            }

            if (param.audio instanceof HTMLMediaElement) {
                audio = param.audio;
            } else if (typeof param.audio === 'string') {
                audio = $(param.audio);

                if (!audio) {
                    throw new TypeError('equalizer there\'s no element that match selector' +
                        param.audio);
                }
            } else {
                throw new TypeError('equalizer parameter "audio" must be string or an audio element');
            }


            return true;
        },



        /**
         * bind input.change events to the filters
         */
        initEvents = function (inputs) {
            [].forEach.call(inputs, function (item, i) {
                item.addEventListener('change', function (e) {
                    filters[i].gain.value = e.target.value;
                }, false);
            });
        },

        /**
         * init inputs range and step
         */
        initInputsData = function (inputs) {
            [].forEach.call(inputs, function (item) {
                item.setAttribute('min', -16);
                item.setAttribute('max', 16);
                item.setAttribute('step', 0.1);
                item.setAttribute('value', 0);
                item.setAttribute('type', 'range');
            });
        },

        /**
         * create frequency filter
         */
        createFilter = function (frequency) {
            var filter = context.createBiquadFilter();

            filter.type = 'peaking';
            filter.frequency.value = frequency;
            filter.gain.value = 0;
            filter.Q.value = 1;
            return filter;
        },

        /**
         * create filter for each frequency
         */
        createFilters = function () {
            var frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

            // create filters
            filters = frequencies.map(function (frequency) {
                return createFilter(frequency);
            });

            // create chain
            filters.reduce(function (prev, curr) {
                prev.connect(curr);
                return curr;
            });
        },

        /**
         * connect Equalizer
         */
        bindEqualizer = function () {
            var source = context.createMediaElementSource(audio);

            source.connect(filters[0]);
            filters[9].connect(context.destination);

        },

        /**
         * main function
         */
        equalizer = function (param) {

            if (validateParam(param)){
                createContext();
                var container = $(param.container);
                var inputs = createInputs('eq-input', container, 10);
                createFilters();
                initInputsData(inputs);
                initEvents(inputs);
                bindEqualizer();
                document.querySelector(param.audio).addEventListener('playing', function() {
                    context.resume().then(() => {
                        console.log('Playback resumed successfully');
                    });
                });
            }
        };

    equalizer.context = context;

    window.equalizer = equalizer;

}());