import validate from 'validate.js';

export function isFormValid(formValue, formConstraints, context) {
    console.log(formValue);
    let formValidation = validate(formValue, formConstraints, {fullMessages: false});

    if(formValidation) {
        console.log(formValidation);
        context.setState({
            formErrors: formValidation
        });        
        return false
    }

    return true;
}