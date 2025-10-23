import { useState } from "react";
import GlobalStore from "./GlobalStore";

const GlobalStoreProvider = ({ children }) => {

    const host = import.meta.env.VITE_SERVER_HOST;

    const demoObj = {
        "summary": "Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'.Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'.Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'.Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'Vue.js is a JavaScript framework designed for creating user interfaces. It prioritizes simplicity, allowing users to progressively incorporate features and tools for building complex web applications. Vue.js enables the creation of components with encapsulated data, which are reactively linked to HTML templates. Changes to the data trigger automatic re-rendering of the view. Vue.js offers HTML-based template syntax, interpolation using double braces, and directives for controlling HTML behavior based on data. Conditional rendering is possible with 'v-if'",
        "keywords": [
            "JavaScript framework",
            "Front-end UIs",
            "Simplicity",
            "Progressive enhancement",
            "Components",
            "Encapsulated data",
            "Reactive binding",
            "Templates",
            "Declarative views",
            "HTML-based template syntax",
            "Directives",
            "Conditional rendering",
            "'V-if'",
            "Performance",
            "JavaScript framework",
            "Front-end UIs",
            "Simplicity",
            "Progressive enhancement",
            "Components",
            "Encapsulated data",
            "Reactive binding",
            "Templates",
            "Declarative views",
            "HTML-based template syntax",
            "Directives",
            "Conditional rendering",
            "'V-if'",
            "Performance"
        ]
    }

    const [fileInput, setFileInput] = useState(null);
    const [linkInput, setLinkInput] = useState("");
    const [resObj, setResObj] = useState(null);


    const summarizeLocalVid = async () => {
        if (fileInput) {
            try {
                const formData = new FormData();
                formData.append("input", fileInput);

                const response = await fetch(`${host}/summarize/local`, {
                    method: "POST",
                    body: formData,
                });

                const json = await response.json();
                setResObj(json);
            } catch (error) {
                console.log("Error in summarizeLocalVid: ", error);
                throw error;
            }
        }
    };

    const summarizeYtVid = async () => {
        if (linkInput) {
            try {
                const data = { "videoLink": linkInput };

                const response = await fetch(`${host}/summarize/ytvid`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const json = await response.json();
                setResObj(json);
            } catch (error) {
                console.log("Error in summarizeYtVid: ", error);
                throw error;
            }
        }
    };


    return (
        <GlobalStore.Provider value={{ fileInput, setFileInput, linkInput, setLinkInput, resObj, setResObj, summarizeLocalVid, summarizeYtVid }}>
            {children}
        </GlobalStore.Provider>
    );
};

export default GlobalStoreProvider;
