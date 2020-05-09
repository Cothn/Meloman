(function () {

    var context = null,
        //audio = null,
        delayEchoNodes = [],
        gainEchoNodes = [],


        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
            delayEchoNodes = [];
                gainEchoNodes = [];
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "echoEffect";
            node.type = "checkbox";
            label = document.createTextNode("Echo");
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

                    source.connect(gainEchoNodes[0]);
                    delayEchoNodes[0].connect(output);
                }
                else{
                    source.disconnect(gainEchoNodes[0]);
                    delayEchoNodes[0].disconnect(output);
                }
            });
        },



        /**
         * create filter for each frequency
         */
        createFilters = function (number) {

            delayEchoNodes.push(context.createDelay());
            gainEchoNodes.push(context.createGain());
            delayEchoNodes[0].delayTime.value = 0.05;
            gainEchoNodes[0].gain.value = 0.6;
            gainEchoNodes[0].connect(delayEchoNodes[0]);

            for(let i= 1; i<number; i++) {
                delayEchoNodes.push(context.createDelay());
                gainEchoNodes.push(context.createGain());
                delayEchoNodes[i].delayTime.value = 0.05;
                gainEchoNodes[i].gain.value = 0.7;
                gainEchoNodes[i].connect(delayEchoNodes[i]);
                gainEchoNodes[i-1].connect(gainEchoNodes[i]);
                delayEchoNodes[i].connect(delayEchoNodes[i-1]);

            }
        },


        /**
         * main function
         */
        echo = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                let input =createInput(container);
                console.log(input.id);
                createFilters(7);
                initEvent(input, param.source, param.output);
                return gainEchoNodes[0];

            }
        };

    echo.context = context;

    window.echo = echo;

}());