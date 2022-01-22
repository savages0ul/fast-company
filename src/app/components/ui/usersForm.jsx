import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { validator } from '../../utils/validator';
import api from '../../api';
import TextField from '../common/form/textField';
import RadioField from '../common/form/radioField';
import SelectField from '../common/form/selectField';
import MultiSelectField from '../common/form/multiSelectField';

const UsersForm = () => {
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(async () => {
        const [users, professions, qualities] = await Promise.all([
            api.users.getById(userId),
            api.professions.fetchAll(),
            api.qualities.fetchAll()
        ]);
        setUser(users);
        setProfession(professions);
        setQualities(qualities);
    }, []);

    const professionsData =
        professions &&
        Object.values(professions).map((profession) => ({
            name: profession.name,
            value: profession._id
        }));

    const qualitiesData =
        qualities &&
        Object.values(qualities).map((qualitie) => ({
            label: qualitie.name,
            value: qualitie._id
        }));

    const defaultValueQualities =
        user &&
        user.qualities.map((qualitie) => ({
            label: qualitie.name,
            value: qualitie._id
        }));

    const handleChange = (target) => {
        const newValue = {};
        if (target.name === 'profession') {
            const newProfession = professionsData.find(
                (profession) => profession.value === target.value
            );
            newValue[target.name] = {
                _id: newProfession.value,
                name: newProfession.name
            };
        } else if (target.name === 'qualities') {
            const newQualities = new Set(target.value.map((v) => v.value));
            newValue[target.name] = qualitiesData
                .filter((qual) => newQualities.has(qual.value))
                .map((qual) =>
                    Object.values(qualities).find(
                        (qualitie) => qualitie._id === qual.value
                    )
                );
        } else {
            newValue[target.name] = target.value;
        }
        setUser((prevState) => ({
            ...prevState,
            ...newValue
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Email обязателен для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [user]);

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users.update(user._id, user);
        history.push(`/users/${userId}`);
    };
    if (user) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Choose..."
                                options={professionsData}
                                name="profession"
                                onChange={handleChange}
                                value={user.profession._id}
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' },
                                    { name: 'Other', value: 'other' }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualitiesData}
                                onChange={handleChange}
                                defaultValue={defaultValueQualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UsersForm;
