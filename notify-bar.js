(() => {
    document.addEventListener("DOMContentLoaded", (e) => {

        let config = window.SmartAzanNotification;

        if (!config.container)
            return console.error("Notify Plugin: No container div provided.");

        let element = document.getElementById(config.container);
        if (!element)
            return console.error("Notify Plugin: Container not found in DOM.");
        let json = config.data;
        let currentIndex = 0;
        const selected = weightedRandomSelection(json);
        injectShakeCSS();

        element.innerHTML = "";
        createItem(element, selected);


        function labelContent(data) {
            let output;
            if (data.icon) {
                output = `
                 <span class="label-content">
                <i class="fa-brands ${data.icon} ${data.iconClass ? data.iconClass : ''}"></i>
                ${data.text}     
                </span>
                `
            } else {
                output = data.text;
            };

            if (window.DOMPurify && typeof window.DOMPurify.sanitize === "function") {
                return DOMPurify.sanitize(output);
            } else {
                return output;
            }
            
        }

        function createItem(ele, data) {
            let newAnchor = document.createElement("a");
            newAnchor.href = data.link;
            newAnchor.innerHTML = labelContent(data);

            // fwd arrow
            let arrowFwd = document.createElement("a");
            arrowFwd.onclick = function () {
                arrowCard(ele, "a");
            };

            const arrowFwdSvg = `
                <span class="arrow-icon">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C8.29866 22 5.06694 19.989 3.33789 17M12 16L16 12M16 12L12 8M16 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
                </span>`;

            arrowFwd.innerHTML = arrowFwdSvg;

            // end fwd

            // fwd arrow
            let arrowBck = document.createElement("a");
            arrowBck.onclick = function () {
                arrowCard(ele, "b");
            };

            const arrowBckSvg = `
        <span class="arrow-icon">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20.6621 17C18.933 19.989 15.7013 22 11.9999 22C6.47703 22 1.99988 17.5228 1.99988 12C1.99988 6.47715 6.47703 2 11.9999 2C15.7013 2 18.933 4.01099 20.6621 7M11.9999 8L7.99995 12M7.99995 12L11.9999 16M7.99995 12H21.9999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
        </span>`;




            arrowBck.innerHTML = arrowBckSvg;

            // end fwd

            if (json.length > 1) {
                ele.appendChild(arrowBck);
            }

            ele.appendChild(newAnchor);
            if (json.length > 1) {
                ele.appendChild(arrowFwd);
            }
            ele.classList.add("shake");


        }

        function injectShakeCSS() {
            const style = document.createElement("style");
            style.innerHTML = `
                    .shake {
                        animation: shakeAnim 2s ease;
                        animation-duration: 1s;
                        animation-delay: 2s;
                        animation-iteration-count: 2;

                    }
                    @keyframes shakeAnim {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                    .arrow-icon {
                    
                      border-radius: 50%;
                      padding: 6px;
                    }
                    .arrow-icon:hover {
                      background: rgba(255,255,255,0.28);
                      transform: scale(1.05);
                    }
                    .label-content {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        }
                    .social-instagram {
                        color: #E4405F; 
                    }
                    .social-youtube  { color: #FF0000; }



                `;
            document.head.appendChild(style);
        }

        function arrowCard(ele, direction) {
            if (direction === "a") {
                // forward
                currentIndex = (currentIndex + 1) % json.length;
            } else {
                // backward
                currentIndex = (currentIndex - 1 + json.length) % json.length;
            }

            ele.getElementsByTagName("A")[1].innerHTML = labelContent(json[currentIndex]);
            ele.getElementsByTagName("A")[1].href = json[currentIndex].link;
        }

        function weightedRandomSelection(items, weightKey = "weight") {
            // Calculate total weight
            const totalWeight = items.reduce(
                (sum, item) => sum + item[weightKey],
                0
            );

            // Generate random number between 0 and totalWeight
            let random = Math.random() * totalWeight;

            // Select item based on cumulative weights
            for (const [i, item] of items.entries()) {
                random -= item[weightKey];
                if (random <= 0) {
                    currentIndex = i;
                    return item;
                }
            }

            // Fallback (shouldn't reach here)
            return items[items.length - 1];
        }
    });
})();