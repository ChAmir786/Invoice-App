import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './App.css'; 

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  friends: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    })
  ),
});

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

function App() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Invite Friends</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Add the validation schema here
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FieldArray name="friends">
              {({ insert, remove, push }) => (
                <div>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div
                        className="flex flex-wrap mb-4 space-y-2 sm:space-y-0 sm:space-x-4"
                        key={index}
                      >
                        <div className="w-full sm:w-1/2">
                          <label
                            htmlFor={`friends.${index}.name`}
                            className="block text-gray-700"
                          >
                            Name
                          </label>
                          <Field
                            name={`friends.${index}.name`}
                            placeholder="Jane Doe"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                          {errors.friends?.[index]?.name && touched.friends?.[index]?.name ? (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.friends[index].name}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label
                            htmlFor={`friends.${index}.email`}
                            className="block text-gray-700"
                          >
                            Email
                          </label>
                          <Field
                            name={`friends.${index}.email`}
                            placeholder="jane@acme.com"
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                          {errors.friends?.[index]?.email && touched.friends?.[index]?.email ? (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.friends[index].email}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full sm:w-auto flex items-end">
                          <button
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => push({ name: '', email: '' })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Invite
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
