import React, {Component} from 'react';
import './Faqs.css';

class FaqCategories extends Component {
    constructor() {
        super();
        this.state = {
            category: null,
            faqs: []
        };
    }

    load(category) {
        let that = this;

        fetch(that.props.host + '/content/we-retail/api/faqs/' + category.name + '.model.json').then(function (response) {
            response.json().then(function(data) {
                let order = data[":items"].root[":itemsOrder"],
                    orderedFaqs = [];

                order.forEach(function(i) {
                    orderedFaqs.push(data[":items"].root[":items"][i][":items"]);
                });

                that.setState({
                    category: category,
                    faqs: orderedFaqs
                });

                that.props.nextStep();
            });

        }).catch(function (ex) {
            console.log('Parsing of initial API end-point JSON data failed', ex)
        })
    }

    render() {
        return (
            <div className="Categories">
                <ul>
                    {this.props.categories.map(category =>
                        <li key={category.name}>
                            <button onClick={this.load.bind(this, category)}>{ category['title'] } FAQs</button>
                        </li>
                    )}
                </ul>

                <Faqs category={this.state.category} faqs={this.state.faqs}></Faqs>
            </div>
        )
    }
}

class Faqs extends Component {

    render() {
        let hasFaqs = this.props.faqs.length > 0,
            faqsInitialized = this.props.category != null;

        if (!faqsInitialized) {
            return <p className="InlineInstructions">Review the instructions --></p>
        } else if (hasFaqs) {
            return (
                <div>
                    <h4>There are {this.props.faqs.length} {this.props.category.title} FAQs.</h4>
                    {this.props.faqs.map(faq =>
                        <div key={faq.question.value}>
                            <Faq faq={faq}/>
                        </div>
                    )}
                </div>
            );
        } else {
            return <h3>FAQs unavailable at this time</h3>
        }
    }
}

class Faq extends Component {
    render() {
        return (
            <div className="Faq">
                <h3><label>{this.props.faq.question.title}:</label> {this.props.faq.question.value}</h3>
                <div dangerouslySetInnerHTML={{__html: this.props.faq.answer.value}} />
            </div>
        )
    }
}

export default FaqCategories;
