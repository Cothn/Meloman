(function () {

    var context = null,
        //audio = null,
        inputNodeEcho = context.createDelay(),
        outputNodeEcho = context.createGain(),
        filters = [],

        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "echoEffect";
            label = document.createTextNode("Echo");
            node.appendChild(label);
            container.appendChild(node);
            return node;
        },

        /**
         * check param
         */
        validateParam = function (param) {
            if (!param) {
                throw new TypeError('error equalizer must have audio and input container params');
            }
            return true;
        },



        /**
         * bind input.change events to the filters
         */
        initEvent = function (input) {
            input.addEventListener('change', function() {
                if(this.checked) {

                    source.connect(inputNodeEcho);
                    outputNodeEcho.connect(equalizerInput);
                }
                else{
                    source.disconnect(inputNodeEcho);
                    outputNodeEcho.disconnect(equalizerInput);
                }
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
        echo = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                var input =createInput(container);
                createFilters();
                initInputsData(input);
                initEvent(input);
                return bindEqualizer(param.next_node);
                //return context;

                //echo
                var delayNodeEcho = context.createDelay();
                var gainNodeEcho = context.createGain();
                delayNodeEcho.delayTime.value = 0.05;
                gainNodeEcho.gain.value = 0.7;
                gainNodeEcho.connect(delayNodeEcho);

            }
        };

    equalizer.context = context;

    window.equalizer = echo;

}());