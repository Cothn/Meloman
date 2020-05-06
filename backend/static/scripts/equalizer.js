(function () {

    var context = null,
        //audio = null,
        frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000],
        filters = [],

        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
        },
        /**
         * creates number input elements
         */
        createInputs = function (className, container, label_container) {
            var inputs = [],
                node,
            label;
            frequencies.forEach(value => {
                node = document.createElement('input');
                node.className = className;
                container.appendChild(node);
                inputs.push(node);
                label =document.createElement('p');
                label.className = className+'_label';
                node = document.createTextNode(value.toString());
                label.appendChild(node);
                label_container.appendChild(label);
            });


            return inputs;
        },

        /**
         * check param
         */
        validateParam = function (param) {
            if (!param) {
                throw new TypeError('error equalizer must have audio and input container params');
            }
/*
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

*/
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
            filter.Q.value = 0.9;
            return filter;
        },

        /**
         * create filter for each frequency
         */
        createFilters = function () {


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
        bindEqualizer = function (nextNode) {
            //var source = context.createMediaElementSource(audio);

            //source.connect(filters[0]);
            filters[filters.length-1].connect(nextNode);
            return filters[0];

        },

        /**
         * main function
         */
        equalizer = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                var label_container = $(param.container+'_label');
                var inputs = createInputs('eq-input', container, label_container);
                createFilters();
                initInputsData(inputs);
                initEvents(inputs);
                return bindEqualizer(param.next_node);
                //return context;
            }
        };

    equalizer.context = context;

    window.equalizer = equalizer;

}());