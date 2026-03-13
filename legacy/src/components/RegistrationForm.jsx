import React, { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import './RegistrationForm.css';

const RegistrationForm = ({ event, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        department: '',
        year: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const departments = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CSBS', 'AIDS'];
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.rollNo.trim()) {
            newErrors.rollNo = 'Roll number is required';
        } else if (!/^[A-Z0-9]{10}$/i.test(formData.rollNo)) {
            newErrors.rollNo = 'Must be exactly 10 alphanumeric characters';
        }
        if (!formData.department) newErrors.department = 'Required';
        if (!formData.year) newErrors.year = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                onSuccess(formData);
            }, 1800);
        }
    };

    return (
        <div className="registration-form-box animate-fade-in">
            <h4 className="form-title-sm mb-1">Verify Registration Info</h4>
            <form onSubmit={handleSubmit} className="v-form">

                <div className="v-input-group">
                    <label className="v-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className={`v-field ${errors.name ? 'v-error' : ''}`}
                        placeholder="e.g. Rohit Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    {errors.name && <span className="v-error-msg">{errors.name}</span>}
                </div>

                <div className="v-input-group">
                    <label className="v-label">College Roll Number</label>
                    <input
                        type="text"
                        name="rollNo"
                        className={`v-field v-upper ${errors.rollNo ? 'v-error' : ''}`}
                        placeholder="e.g. 21PA1A0501"
                        value={formData.rollNo}
                        onChange={handleChange}
                        maxLength={10}
                        disabled={isSubmitting}
                    />
                    {errors.rollNo && <span className="v-error-msg">{errors.rollNo}</span>}
                </div>

                <div className="v-row">
                    <div className="v-input-group flex-1">
                        <label className="v-label">Department</label>
                        <select
                            name="department"
                            className={`v-field ${errors.department ? 'v-error' : ''}`}
                            value={formData.department}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option value="" disabled>Dept</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.department && <span className="v-error-msg">{errors.department}</span>}
                    </div>

                    <div className="v-input-group flex-1">
                        <label className="v-label">Year</label>
                        <select
                            name="year"
                            className={`v-field ${errors.year ? 'v-error' : ''}`}
                            value={formData.year}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option value="" disabled>Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {errors.year && <span className="v-error-msg">{errors.year}</span>}
                    </div>
                </div>

                <div className="v-actions mt-1">
                    <button
                        type="button"
                        className="btn btn-outline v-btn-small"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary v-btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin" size={18} /> Verifying...</>
                        ) : (
                            <><ShieldCheck size={18} /> Confirm</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
