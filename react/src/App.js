import React, {Component} from 'react';
import Instructions from './Instructions.js';
import FaqCategories from './Faqs.js';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            host: 'http://localhost:4503',
            step: 1,
            initialized: false,
            title: '',
            intro: '',
            logo: '',
            categories: [],
        };

        this.nextStep = this.nextStep.bind(this);
    }

    updateHost(e) {
        this.setState({host: e.target.value});
    }

    nextStep() {
        let that = this;

        that.setState({
            step: that.state.step + 1
        });
    }

    initialize() {
        let that = this;

        fetch(that.state.host + '/content/we-retail/api/faqs.model.json').then(function (response) {
            response.json().then(function(data) {
                that.setState({
                    initialized: true,
                    categories: data[":items"].root[":items"].list.items,
                    logo: that.state.host + data[":items"].root[":items"].image.src,
                    title: data[":items"].root[":items"].title.text,
                    intro: data[":items"].root[":items"].text.text
                });


                that.nextStep();
            });

        }).catch(function (ex) {
            console.log('Parsing of initial API end-point JSON data failed', ex)
        })
    }

    render() {
        return (
            <div>
                <div className={'App Step-' + this.state.step}>
                    <div className="Header-wrapper">
                        <header className="Header">
                            <img alt={this.state.title} src={this.state.logo} className="Logo"/>
                            <h1 className="Title">{this.state.title}</h1>
                        </header>
                    </div>


                    <Intro text={this.state.intro}></Intro>

                    {this.state.initialized ? (
                        <FaqCategories categories={this.state.categories} nextStep={this.nextStep} host={this.state.host}></FaqCategories>
                    ) : (
                        <div className="InitButton-wrapper">
                            <div className="InitButton-host">
                                    <input type="text"
                                           name="host"
                                           onChange={this.updateHost.bind(this)}
                                           placeholder="http://localhost:4503"/>/content/we-retail/api/faqs.model.json
                            </div>
                            <button className="InitButton" onClick={this.initialize.bind(this)}>Connect to AEM Content Services and initialize the app</button>
                        </div>
                    )}
                </div>

                <Instructions step={this.state.step}></Instructions>
            </div>
        );
    }
}

class Intro extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.text}} className="Intro"></div>
        )
    }
}

export default App;