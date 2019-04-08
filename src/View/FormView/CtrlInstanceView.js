import React, {Component} from 'react';
import Select from 'react-select';
import '../../css/CtrlInstanceView.scss'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];



class CtrlInstanceView extends Component {
    handleChange = (selectedOption) => {
       // this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    render() {
        return (
            <div>
                <div className={"ctrlinstanceleftbutton"} >
                    <div>
                        步骤

                    </div>
                    <div  class="row" className={"ctrlinstancetoolbarcontent"}>
                            组:
                            <Select
                                onChange={this.handleChange}
                                options={options}
                                className={"ctrlinstanceselect"}
                            />
                            步骤:
                            <Select

                                onChange={this.handleChange}
                                options={options}
                                className={"ctrlinstanceselect"}
                            />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CtrlInstanceView;