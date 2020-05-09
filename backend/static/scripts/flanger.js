(function () {

    var context = null,
        //audio = null,
        delayFlangerNodes = [],
        gainFlangerNodes = [],
        timeId,


        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
            delayFlangerNodes = [];
                gainFlangerNodes = [];
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "flangerEffect";
            node.type = "checkbox";
            label = document.createTextNode("Flanger");
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

                    source.connect(gainFlangerNodes[0]);
                    delayFlangerNodes[0].connect(output);
                    timeId = setInterval(updateDelayTime, 2000);
                }
                else{
                    source.disconnect(gainFlangerNodes[0]);
                    delayFlangerNodes[0].disconnect(output);
                    clearInterval(timeId);
                }
            });
        },



        /**
         * create filter for each frequency
         */
        createFilters = function (number) {

            delayFlangerNodes.push(context.createDelay());
            gainFlangerNodes.push(context.createGain());
            delayFlangerNodes[0].delayTime.value = 0.05;
            gainFlangerNodes[0].gain.value = 0.9;
            gainFlangerNodes[0].connect(delayFlangerNodes[0]);

            for(let i= 1; i<number; i++) {
                delayFlangerNodes.push(context.createDelay());
                gainFlangerNodes.push(context.createGain());
                delayFlangerNodes[i].delayTime.value = Math.random() * (0.20 - 0.05) + 0.05;
                gainFlangerNodes[i].gain.value = 0.8;
                gainFlangerNodes[i].connect(delayFlangerNodes[i]);
                gainFlangerNodes[i-1].connect(gainFlangerNodes[i]);
                delayFlangerNodes[i].connect(delayFlangerNodes[0]);

            }
        },

        updateDelayTime = function () {
            delayFlangerNodes.forEach(value => {
                value.delayTime.value = Math.random() * (0.20 - 0.05) + 0.05;
            })
        },

        /**
         * main function
         */
        flanger = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                let input =createInput(container);
                console.log(input.id);
                createFilters(7);
                initEvent(input, param.source, param.output);
                return gainFlangerNodes[0];

            }
        };

    flanger.context = context;

    window.flanger = flanger;

}());