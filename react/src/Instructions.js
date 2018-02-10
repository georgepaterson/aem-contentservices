import React, {Component} from 'react';

class Instructions extends Component {
    render() {
        let step = this.props.step || 1;

        return (<div className="Instructions">
                {this.renderInstructions(step)}
                </div>)
    }

    renderInstructions(step) {
        if (step === 1) {
            return this.renderStep1();
        } else if (step === 2) {
            return this.renderStep2();
        } else if (step === 3) {
            return this.renderStep3();
        } else {
            return this.renderStep4();
        }
    }

    renderStep1() {
        return (<div>
            <h2>Step 1</h2>

            <p>
                If needed, adjust the host as needed so this app can access your AEM Publish instance.
            </p>

            <p>
                Click the <strong>"Connect to AEM Content Services and initialize the app"</strong> button.
            </p>

            <p>
                On click, the button instructs the app to make an AJAX request to our FAQ Main API page in AEM:

                <code>HTTP GET /content/we-retail/api/faqs.model.json</code>

                <a href="/content/instructions/step1-code.png" target="_blank" className="Instructions-codeImage">
                    <img className="code" src="/content/instructions/step1-code.png" alt="Code"/>
                    Click to view the code
                </a>

                and retrieve the JSON content for:
            </p>

            <ul>
                <li>App logo</li>
                <li>App title</li>
                <li>Introductory text</li>
                <li>List of FAQ categories</li>
            </ul>

            <p>
                These to-be populated areas are denoted by dashed-line placeholders.
            </p>
            <p>
                Note: Normally this initialization is coded to happen immediately on app load. Requiring you to "click" serves to help illustrate the content sourced from AEM.
            </p>
        </div>)
    }

    renderStep2() {
        return (<div>
            <h2>Step 2</h2>

            <p>
                See how the header, introductory text and FAQ categories are populated from the data defined on the FAQ Main API page in AEM.
            </p>
            <p>
                Click a FAQ category button to load the FAQs for that FAQ Listing API page. On click, the app to make an AJAX request to:

                <code>HTTP GET /content/we-retail/api/faqs/&lt;category&gt;.model.json</code>

                <a href="/content/instructions/step2-code.png" target="_blank" className="Instructions-codeImage">
                    <img className="code" src="/content/instructions/step2-code.png" alt="Code"/>
                    Click to view the code
                </a>


                and retrieve all the FAQs added to that page's layout container.
            </p>
        </div>)
    }

    renderStep3() {
        return (<div>
            <h2>Step 3</h2>

            <p>
                Great job! You've loaded some FAQs!
            </p>
            <p>
                All the FAQ data is available, including metadata such as the number of FAQs and even the labels for the Question and Answer fields.
            </p>
            <p>
                For example, the text <strong>QUESTION</strong> is actually sourced from the FAQ's Content Fragment Model's question field label!
            </p>
            <p>
                Now, click on another category and see what happens!
            </p>
        </div>)
    }

    renderStep4() {
        return (<div>
            <h2>Done!</h2>

            <p>
                No surprise there! The FAQs for the selected category were loaded via AJAX and displayed in the app.
            </p>
            <p>
                Adding new FAQ pages is as simple as creating new FAQ Listing API pages in AEM under /content/api/faqs and populating them with the appropriate We.Retail Content Fragments and FAQ Content Fragments.
            </p>

            <p>
                To run through this app again, just refresh the browser! This time, open your browser's network traffic console to see the data being loaded from AEM.
            </p>
        </div>)

    }
}

export default Instructions;
