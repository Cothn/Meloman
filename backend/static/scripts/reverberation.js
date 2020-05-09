(function () {

    var context = null,
        //audio = null,
        delayReverbNode,
        gainReverbNode,


        $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
            delayReverbNode = context.createDelay();
            gainReverbNode  = context.createGain();
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "reverbEffect";
            node.type = "checkbox";
            label = document.createTextNode("Reverberation");
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

                    source.connect(gainReverbNode );
                    gainReverbNode .connect(output);
                }
                else{
                    source.disconnect(gainReverbNode);
                    gainReverbNode .disconnect(output);
                }
            });
        },



        /**
         * create filter for each frequency
         */
        createFilters = function () {

            delayReverbNode .delayTime.value = 0.3;
            gainReverbNode .gain.value = 0.6;
            gainReverbNode.connect(delayReverbNode );
            delayReverbNode.connect(gainReverbNode );
        },


        /**
         * main function
         */
        reverberation = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                let input =createInput(container);
                console.log(input.id);
                createFilters();
                initEvent(input, param.source, param.output);
                return gainReverbNode;

            }
        };

    reverberation.context = context;

    window.reverberation = reverberation;

}());