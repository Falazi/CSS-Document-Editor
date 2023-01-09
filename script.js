

function create(el, text, appendto) {
    const para = document.createElement(el);
    const node = document.createTextNode(text);
    para.appendChild(node);
    const element = document.querySelector(appendto);
    element.appendChild(para);
}



// Create a function for setting a variable value
function changevar(variable, newval) {
    // Get the root element
    let r = document.querySelector(':root');

    // Create a function for getting a variable value
    function myFunction_get() {
        // Get the styles (properties and values) for the root
        let rs = getComputedStyle(r);
        // Alert the value of the --blue variable
        alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
    }

    // Set the value of variable --blue to another value (in this case "lightblue")
    console.log(variable, newval)
    r.style.setProperty(variable, newval);

}

//removes class from element if its in a list
function removeClass(element, classNames) {
    classNames.forEach(className => {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    });
}


function changeclass(event, others) {
    //console.log(typeof (others))
    var choices = others.split(",")
    // the select element
    var selectElement = event.target;


    // the id of it
    var selectElid = event.target.id;


    console.log("this is:" + selectElid)

    // the value of the selection
    var value = selectElement.value;
    const para = document.querySelectorAll('img');

    var images = document.getElementsByTagName("img");
    console.log(images)


    para.forEach(el => {

        function removefrom(id, list) {
            if (selectElid === id) {
                removeClass(el, list)
            }

        }


        removefrom(selectElid, choices)

        // if (selectElid === "--imagealign") {
        //     removeClass(el, ["Left-class", "Right-class", "Center-class"])
        // }


        el.classList.toggle(`${value}`);
    })

}

function addchoiceclass(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option value="${val}">${val}</option>`
    }
    //console.log(others)
    add(
        ` <label for="${label}">${label}:</label>

    <select name="${label}" id="${variable}" onchange="changeclass(event, '${others}') ">
        ${choices}
    </select > <br>`


    )
}

function addchoicedifname(label, variable, options) {
    // options is an array of objects, each with a 'label' and 'value' property
    var choices = ""
    for (let option of options) {
        choices += `<option value="${option.value}">${option.label}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>
  
    <select name="${label}" id="${variable}" onchange="handleSelectChange(event)">
        ${choices}
    </select> <br>`


    )
}


function add(htmlstring) {
    editor.insertAdjacentHTML('beforeend', htmlstring);
}

function addchoice(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option value="${val}">${val}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>

    <select name="${label}" id="${variable}" onchange="handleSelectChange(event)">
        ${choices}
    </select> <br>`


    )
}

function textchange(text, id, unit, fakepx) {
    if (fakepx == "true") {
        text = text * 0.0625;
        console.log(id, text, "rem")
        changevar(id, text + "rem")
    }
    else {

        changevar(id, text + unit)

    }
}


// add text box choice
function addchoicetext(label, variable, inputtype, defaulttext, step, unit, fakepx) {



    add(
        ` <label for="${variable}">${label}:</label>

      <input type="${inputtype}" min="0" step="${step}" value="${defaulttext}"  id="${variable}" oninput="textchange(this.value, this.id, '${unit}','${fakepx}')"><span style="margin-left:10px;">${unit}</span>
    <br>
      `


    )
}



// like the addchoice function but it shows the options in their actual font
function addchoicefont(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option style="font-family:${val}" value="${val}">${val}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>
        <select name="${label}" id="${variable}" onchange="handleSelectChange(event)">
            ${choices}
        </select> <br>`


    )
}

function getOption(el) {

    const option = el.value;
    if (option === 'esc') return
    console.log(option);
    return option;


}
// changevar("--headerfont", "Arial")

// change default selected option in a select box
// old ver
// function changedefaultop(selectid, option) {
//     document.querySelector(selectid).value = option;
// }

function changedefaultop(selectid, optionLabel) {
    // get the select element with the specified id
    var selectElement = document.querySelector(selectid);

    // remove the "#" prefix from the selectid variable
    var variable = selectid.substring(1);

    // loop through the options of the select element
    selectElement.querySelectorAll('option').forEach(function (option) {
        // if the option label matches the specified option label, set it as the default selection
        if (option.text == optionLabel) {
            // get the value of the option
            var value = option.value;

            // set the selected index of the select element
            selectElement.selectedIndex = option.index;

            // update the CSS variable
            changevar(variable, value);
        }
    });
}



function handleSelectChange(event) {

    // if you want to support some really old IEs, add
    // event = event || window.event;

    // the select element
    var selectElement = event.target;

    // the id of it
    var selectElid = event.target.id;


    // the value of the selection
    var value = selectElement.value;

    // to support really old browsers, you may use
    // selectElement.value || selectElement.options[selectElement.selectedIndex].value;
    // like el Dude has suggested
    console.log(selectElement.id)
    // do whatever you want with value
    console.log(selectElid)
    changevar(selectElid, value)
    console.log(selectElid, `${value}`)
}

const fonts = ["Arial", "Times New Roman", "Georgia"]

create("h2", "Header", "#editor")

addchoicefont("Header Font", "--headerfont", ...fonts)

addchoice("Header Alignment", "--headeralign", "Left", "Center", "Right")


create("h2", "Paragraph", "#editor")


addchoicefont("Paragraph Font", "--paragraphfont", ...fonts)

addchoice("Paragraph Alignment", "--paragraphalign", "Left", "Center", "Right", "Justify")

addchoicetext("Line Height", "--lineheight", "number", "1.5", "0.1", "")


create("h2", "Image", "#editor")


// these options are experimentals

//addchoiceclass("Image Alignment", "--imagealign", "Left", "Center", "Right")

//changedefaultop("#--imagealign", "Center")


addchoicedifname('Image Alignment', '--imagealign', [
    { label: 'Left', value: 'auto auto 0 0' },
    { label: 'Center', value: 'auto auto' },
    { label: 'Right', value: '0 0 auto auto' }
]);

//changedefaultop("#--imagealign", "Center")


addchoicetext("Image Max Size", "--imagemaxsize", "number", "500", "10", "px", "true")


addchoice("Image Float", "--imagefloat", "Left", "None", "Right")
changedefaultop("#--imagefloat", "None")


create("h2", "Page", "#editor")

addchoicetext("Page Width", "--width", "number", "1100", "25", "px", "true")


// create a function to trigger the file dialog with an icon
function triggerFileDialog(iconId, inputId, fileTypes) {
    // get the icon element
    var icon = document.getElementById(iconId);

    // get the input element
    var input = document.getElementById(inputId);

    // add a click event listener to the icon
    icon.addEventListener('click', function () {
        // set the accept attribute of the input element to the specified file types
        input.setAttribute('accept', fileTypes);

        // trigger the click event on the input element
        input.click();
    });
}

function openhtmlormd() {
    // call the function
    triggerFileDialog('open-html', 'file-input', '.html, .md');

    // get the file content div element
    var fileContent = document.getElementById('container');


    // add a change event listener to the input element
    document.getElementById('file-input').addEventListener('change', function () {
        // get the selected file
        var file = this.files[0];

        // create a new FileReader
        var reader = new FileReader();

        // add a load event listener to the FileReader
        reader.addEventListener('load', function () {
            // convert the markdown to HTML
            var html = marked.parse(this.result);

            // create a div element to contain the HTML
            var container = document.createElement('div');
            container.innerHTML = html;

            // insert the div element into the file content div element
            fileContent.innerHTML = '';
            fileContent.appendChild(container);
        });

        // read the file as text
        reader.readAsText(file);
    });
}

openhtmlormd()

// list of css variables
// remember to update this if you add any more variables to style.css
var cssvars = ["--headerfont", "--paragraphfont",
    "--headeralign", "--paragraphalign", "--headercolor",
    "--paragraphcolor", "--imagealign", "--imagemaxsize",
    "--paragraphfontsize", "--imagefloat", "--lineheight",
    "--width"]


// JavaScript
// create a function to trigger the export when the icon is clicked
// JavaScript
// create a function to trigger the export when the icon is clicked
function triggerExport(iconId, containerId) {
    // get the icon element
    var icon = document.getElementById(iconId);

    // get the container element
    var container = document.getElementById(containerId);

    // add a click event listener to the icon
    icon.addEventListener('click', function () {
        // create a new XMLHttpRequest to get the CSS
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var css = this.responseText
            let regex = /:root\s*\{[^]*?\}/;
            //const regex = /(--[a-zA-Z]+):(.*[a-zA-Z]+);/gm;
            //const result = str.replace(regex, subst);
            var html = document.querySelector("html");
            var htmlstyles = window.getComputedStyle(html);
            console.log(htmlstyles)


            // gets the styles of it
            var style = getComputedStyle(document.body)

            let root = document.documentElement;
            let computedStyles = getComputedStyle(root);


            var cssvalcol = ":root{\n"

            //console.log(`This is the value of headerfont: ${cssval}`);

            cssvars.forEach(cssvar => {
                //var css = css.replace(regex, subst);
                var cssval = computedStyles.getPropertyValue(cssvar);

                cssvalcol += `${cssvar}:${cssval};\n`
                // console.log(cssvar, style.getPropertyValue(cssvar))
            });

            cssvalcol += "}"

            //            console.log(cssvalcol)
            var css = css.replace(regex, cssvalcol);


            // create a new Blob with the HTML content
            var blob = new Blob([
                // add the HTML boilerplate
                '<!DOCTYPE html>\n' +
                '<html>\n' +
                '<head>\n' +
                // add the style element with the CSS content
                '  <style>\n' + css + '  </style>\n' +
                '</head>\n' +
                '<body>\n' +
                // add the container element with the HTML content
                container.outerHTML + '\n' +
                '</body>\n' +
                '</html>\n'
            ], { type: 'text/html' });

            // create a link element
            var link = document.createElement('a');

            // set the href and download attributes of the link element
            link.href = URL.createObjectURL(blob);
            link.download = 'export.html';

            // append the link element to the document
            document.body.appendChild(link);

            // click the link element to trigger the download
            link.click();

            // remove the link element
            document.body.removeChild(link);
        };
        xhr.open('GET', 'style.css');

        xhr.send();
    });
}

function exportcss(iconId, containerId) {
    // get the icon element
    var icon = document.getElementById(iconId);

    // get the container element
    var container = document.getElementById(containerId);

    // add a click event listener to the icon
    icon.addEventListener('click', function () {
        // create a new XMLHttpRequest to get the CSS
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var css = this.responseText
            let regex = /:root\s*\{[^]*?\}/;
            //const regex = /(--[a-zA-Z]+):(.*[a-zA-Z]+);/gm;
            //const result = str.replace(regex, subst);
            var html = document.querySelector("html");
            var htmlstyles = window.getComputedStyle(html);
            console.log(htmlstyles)


            // gets the styles of it
            var style = getComputedStyle(document.body)

            let root = document.documentElement;
            let computedStyles = getComputedStyle(root);


            var cssvalcol = ":root{\n"

            //console.log(`This is the value of headerfont: ${cssval}`);

            cssvars.forEach(cssvar => {
                //var css = css.replace(regex, subst);
                var cssval = computedStyles.getPropertyValue(cssvar);

                cssvalcol += `${cssvar}:${cssval};\n`
                // console.log(cssvar, style.getPropertyValue(cssvar))
            });

            cssvalcol += "}"

            //            console.log(cssvalcol)
            var css = css.replace(regex, cssvalcol);


            // create a new Blob with the HTML content
            var blob = new Blob([css
            ], { type: 'text/css' });

            // create a link element
            var link = document.createElement('a');

            // set the href and download attributes of the link element
            link.href = URL.createObjectURL(blob);
            link.download = 'export.html';

            // append the link element to the document
            document.body.appendChild(link);

            // click the link element to trigger the download
            link.click();

            // remove the link element
            document.body.removeChild(link);
        };
        xhr.open('GET', 'style.css');

        xhr.send();
    });
}

// call the function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    triggerExport('export-html', 'container');
    exportcss('export-css', 'container');

});