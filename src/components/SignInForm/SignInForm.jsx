import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); //how we update user state
    
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setMessage('');
        setFormData({...formData, [event.target.name]: event.target.value})
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const signedInUser = await signIn(formData);
            setUser(signedInUser);
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        }
    };
    return (
        <main>
            <h1>Sign In</h1>
            <p>{message}</p>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text'
                        autoComplete='off'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password'
                        autoComplete='off'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button>Sign In</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default SignInForm;