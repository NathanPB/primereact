import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Rating extends Component {

    static defaultProps = {
        id: null,
        value: null,
        disabled: false,
        readonly: false,
        stars: 5,
        cancel: true,
        style: null,
        className: null,
        onChange: null
    }

    static propsTypes = {
        id: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        stars: PropTypes.number,
        cancel: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    rate(event, i) {
        if(!this.props.readonly && !this.props.disabled && this.props.onChange) {
            this.props.onChange({
                originalEvent: event,
                value: i
            });
        }
        
        event.preventDefault();        
    }
    
    clear(event) {
        if(!this.props.readonly && !this.props.disabled && this.props.onChange) {
            this.props.onChange({
                originalEvent: event,
                value: null
            });
        }
        
        event.preventDefault();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.value === this.props.value && nextProps.disabled === this.props.disabled) {
            return false;
        }

        return true;
    }

    render() {
        var className = classNames('ui-rating', this.props.className, {'ui-state-disabled': this.props.disabled});
                
        if(this.props.cancel) {
            var cancel = <a onClick={this.clear}>
                        <span className="ui-rating-icon pi pi-ban"></span>
                      </a>;
        }

        var starsArray = [];
        for(var i = 0; i < this.props.stars; i++) {
            starsArray[i] = i + 1;
        }
        
        var stars = starsArray.map((value) => {
            var iconClass = classNames('ui-rating-icon pi', {
                'pi-star-o': (!this.props.value || value > this.props.value),
                'pi-star': (value <= this.props.value)
            });
            
            return <a onClick={(e) => this.rate(e, value)} key={value}>
                      <span className={iconClass}></span>
                   </a>;
        });
                
        return <div id={this.props.id} className={className} style={this.props.style}>
                    {cancel}
                    {stars}
                </div>;
    }
}