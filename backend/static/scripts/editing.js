
(function () {

    var context = null,
        chunks = [],
        dest = null,
        mediaRecorder  = null,

        $ = document.querySelector.bind(document),
        createMediaRecorder = function (param) {
            context = param.context;
            dest = context.createMediaStreamDestination();
            mediaRecorder  = new MediaRecorder(dest.stream);
            mediaRecorder.ondataavailable = function(evt) {
                // push each chunk (blobs) in an array
                chunks.push(evt.data);
            };
        },

        /**
         * creates number input elements
         */
        createInputs = function (container) {
            var node, label;

            node = document.createElement('button');
            node.id = "startRecord";
			node.className = "login100-form-btn";
            label = document.createTextNode("Start record");
            node.appendChild(label);
            container.appendChild(node);

            node = document.createElement('button');
            node.id = "stopRecord";
			node.className = "login100-form-btn";
            node.hidden = true;
            label = document.createTextNode("Stop record");
            node.appendChild(label);
            container.appendChild(node);

            node = document.createElement('button');
            node.id = "pauseRecord";
			node.className = "login100-form-btn";
            node.hidden = true;
            label = document.createTextNode("Pause record");
            node.appendChild(label);
            container.appendChild(node);

            node = document.createElement('button');
            node.id = "resumeRecord";
			node.className = "login100-form-btn";
            node.hidden = true;
            label = document.createTextNode("Resume record");
            node.appendChild(label);
            container.appendChild(node);

            node = document.createElement('button');
            node.id = "saveBtn";
			node.className = "login100-form-btn";
            node.hidden = true;
            label = document.createTextNode("Save fragment");
            node.appendChild(label);
            container.appendChild(node);
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
         * bind input.change events
         */
        initEvents = function (source) {
            document.getElementById('startRecord').addEventListener('click', function (e) {

                chunks = [];
                source.connect(dest);
                audio.play();
                mediaRecorder.start();
                this.hidden = true;
                document.getElementById('stopRecord').hidden = false;
                document.getElementById('pauseRecord').hidden = false;
                document.getElementById('saveBtn').hidden = true;
            });

            document.getElementById('stopRecord').addEventListener('click', function (e) {
                mediaRecorder.stop();
                audio.pause();
                source.disconnect(dest);
                this.hidden = true;
                document.getElementById('pauseRecord').hidden = true;
                document.getElementById('resumeRecord').hidden = true;
                document.getElementById('startRecord').hidden = false;
                document.getElementById('saveBtn').hidden = false;
            });

            document.getElementById('resumeRecord').addEventListener('click', function (e) {
                audio.play();
                mediaRecorder.resume();
                this.hidden = true;
                document.getElementById('pauseRecord').hidden = false;

            });

            document.getElementById('pauseRecord').addEventListener('click', function (e) {
                mediaRecorder.pause();
                audio.pause();
                this.hidden = true;
                document.getElementById('resumeRecord').hidden = false;
            });

        },


        /**
         * save button event
         */
        ///COOOOOOKIE AUTHORIZE
        saveFragment = function (endpoint) {
            document.getElementById('saveBtn').addEventListener('click', function (e) {
                // Make blob out of our blobs, and open it.
                var blob = new Blob(chunks, { 'type' : 'audio/mpeg' });

                const formData = new FormData();
                formData.append('file_data', blob);

				var currUserToken = getCookie("userToken");					

                fetch("http://localhost:3000/api/music",  {
                    method: 'POST',
                    headers: {
                        'Authorization':`Bearer ${currUserToken}`
                    },
                    body: formData})
                    .then(async response => {
                        var result = await response.json();
                        if (response.ok)
                        {
                            document.getElementById(endpoint).src = result.file_path;
                            console.log('Успех:', JSON.stringify(result));
                            this.hidden = true;
                        }
                        else
                        {
                            alert(result.message);
                        }
                    })
                    .catch(error => console.log('error', error));
            });
        },

        /**
         * main function
         */
        editing = function (param) {

            if (validateParam(param)) {
                createMediaRecorder(param);
                createInputs($(param.container));
                initEvents(param.source);
                saveFragment(param.endpoint);

            }

        };

    editing.context = context;
    window.editing = editing;
}());