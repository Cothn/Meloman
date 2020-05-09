(function () {

    var context = null,
        //audio = null,
        delayPhaseNodes = [],
        gainPhaseNodes = [],


        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
            delayPhaseNodes = [];
                gainPhaseNodes = [];
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "phaseEffect";
            node.type = "checkbox";
            label = document.createTextNode("Phase");
            container.appendChild(node);
            container.appendChild(label);
            label = document.createElement('br');
            container.appendChild(label);
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
        initEvent = function (input, source, output) {

            input.addEventListener('change', function() {
                if(this.checked) {

                    source.connect(gainPhaseNodes[0]);
                    delayPhaseNodes[0].connect(output);
                }
                else{
                    source.disconnect(gainPhaseNodes[0]);
                    delayPhaseNodes[0].disconnect(output);
                }
            });
        },



        /**
         * create filter for each frequency
         */
        createFilters = function (number) {

            delayPhaseNodes.push(context.createDelay());
            gainPhaseNodes.push(context.createGain());
            delayPhaseNodes[0].delayTime.value = 0.00001;
            gainPhaseNodes[0].gain.value = 0.9;
            gainPhaseNodes[0].connect(delayPhaseNodes[0]);

            for(let i= 1; i<7; i++) {
                delayPhaseNodes.push(context.createDelay());
                gainPhaseNodes.push(context.createGain());
                delayPhaseNodes[i].delayTime.value = Math.random() * (0.00005 - 0.00001) + 0.00001;
                gainPhaseNodes[i].gain.value = 1;
                gainPhaseNodes[i].connect(delayPhaseNodes[i]);
                gainPhaseNodes[i-1].connect(gainPhaseNodes[i]);
                delayPhaseNodes[i].connect(delayPhaseNodes[0]);

            }
        },


        /**
         * main function
         */
        phase = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                let input =createInput(container);
                console.log(input.id);
                createFilters(7);
                initEvent(input, param.source, param.output);
                //return context;

            }
        };

    phase.context = context;

    window.phase = phase;

}());