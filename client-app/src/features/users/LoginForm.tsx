import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function LoginForm (){
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => console.log(values)}
        >
            {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <Button positive content='login' type="submit" fuild/>
                </Form>
            )}

        </Formik>
    )
}