(function () {

    var context = null,
        //audio = null,
        delayChorusNodes = [],
        gainChorusNodes = [],
        chorusFilter =[],
        lowpassFilter,

    $ = document.querySelector.bind(document),
        createContext = function (param) {
            context = param.context;
            delayChorusNodes = [];
            gainChorusNodes = [];
            chorusFilter =[];
            lowpassFilter = context.createBiquadFilter();
        },
        /**
         * creates number input elements
         */
        createInput = function (container) {
            var node, label;

            node = document.createElement('input');
            node.id = "chorusEffect";
            node.type = "checkbox";
            label = document.createTextNode("Chorus");
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

                    source.connect(lowpassFilter);
                    delayChorusNodes[0].connect(output);
                }
                else{
                    source.disconnect(lowpassFilter);
                    delayChorusNodes[0].disconnect(output);
                }
            });
        },



        /**
         * create filter for each frequency
         */
        createFilters = function (number) {

            delayChorusNodes.push(context.createDelay());
            gainChorusNodes.push(context.createGain());
            delayChorusNodes[0].delayTime.value = 0.06;
            gainChorusNodes[0].gain.value = 0.9;

            gainChorusNodes[0].connect(delayChorusNodes[0]);

            lowpassFilter.type = 'lowpass';
            lowpassFilter.frequency.value = 2500;
            lowpassFilter.Q.value = 1;
            lowpassFilter.connect(gainChorusNodes[0]);

            chorusFilter.push(context.createBiquadFilter());

            for(let i= 1; i<number; i++) {
                delayChorusNodes.push(context.createDelay());
                gainChorusNodes.push(context.createGain());
                delayChorusNodes[i].delayTime.value = 0.01;
                gainChorusNodes[i].gain.value = 0.8;
                gainChorusNodes[i].connect(delayChorusNodes[i]);

                delayChorusNodes[i].connect(delayChorusNodes[i-1]);
                chorusFilter.push(context.createBiquadFilter());
                chorusFilter[i].type = 'peaking';
                chorusFilter[i].frequency.value = 800;
                chorusFilter[i].gain.value = Math.random() * (3 +3) - 3;
                chorusFilter[i].Q.value = 0.9;
                gainChorusNodes[i-1].connect(chorusFilter[i]);
                chorusFilter[i].connect(gainChorusNodes[i]);

            }
        },


        /**
         * main function
         */
        chorus = function (param) {

            if (validateParam(param)){
                createContext(param);
                var container = $(param.container);
                let input =createInput(container);
                console.log(input.id);
                createFilters(10);
                initEvent(input, param.source, param.output);
                //return context;

            }
        };

    chorus.context = context;

    window.chorus = chorus;

}());