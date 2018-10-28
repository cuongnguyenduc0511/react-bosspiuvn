import validate from 'validate.js';

export function isFormValid(formValue, formConstraints, context) {
    let formValidation = validate(formValue, formConstraints, {fullMessages: false});

    for(let k in formValidation) {
        formValidation[k] = formValidation[k] ? {
            errorMessage: formValidation[k][0]
        } : null
    }

    context.setState({
        formErrors: formValidation
    });        

    return formValidation ? false : true; 

}