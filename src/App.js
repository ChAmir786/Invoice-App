import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "./redux/slices/formSlice"; // Assuming you have this action in Redux
import * as Yup from "yup";
import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  senderStreet: Yup.string().required("Street Address is required"),
  senderCity: Yup.string().required("City is required"),
  senderPostCode: Yup.string().required("Post Code is required"),
  senderCountry: Yup.string().required("Country is required"),
  clientName: Yup.string().required("Client's Name is required"),
  clientEmail: Yup.string().email("Invalid email").required("Client's Email is required"),
  clientStreet: Yup.string().required("Street Address is required"),
  clientCity: Yup.string().required("City is required"),
  clientPostCode: Yup.string().required("Post Code is required"),
  clientCountry: Yup.string().required("Country is required"),
  description: Yup.string().required("Project Description is required"),
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().required("Item Name is required"),
      quantity: Yup.number().required("Quantity is required").positive("Must be positive"),
      price: Yup.number().required("Price is required").positive("Must be positive"),
    })
  ),
});

function App() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Retrieve form data from Redux
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <section className="p-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-around items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-500">There are 7 total invoices</p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">Filter by status</p>
            </div>
            <button onClick={handleOpenModal} className="px-3 py-3 bg-violet-700 text-white rounded-2xl hover:bg-violet-400">
              <AddCircleOutlineIcon /> New Invoice
            </button>
          </div>
        </div>

        <ul className="mb-6"></ul>

        {/* Modal for New Invoice Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-start z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Formik
                initialValues={{
                  senderStreet: "",
                  senderCity: "",
                  senderPostCode: "",
                  senderCountry: "",
                  clientName: "",
                  clientEmail: "",
                  clientStreet: "",
                  clientCity: "",
                  clientPostCode: "",
                  clientCountry: "",
                  description: "",
                  items: [{ itemName: "", quantity: 1, price: 0 }],
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(updateForm(values));
                  console.log("Form submitted", values);
                  handleCloseModal(); // Close modal on form submission
                }}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    {/* Bill From Fields */}
                    <div className="mb-6">
                      <h2 className="font-semibold mb-2 text-gray-800">Bill From</h2>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600">Street Address</label>
                        <Field name="senderStreet" className="w-full p-2 border border-gray-300 rounded" />
                        {errors.senderStreet && touched.senderStreet && (
                          <div className="text-sm text-red-600 mt-1">{errors.senderStreet}</div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">City</label>
                          <Field name="senderCity" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.senderCity && touched.senderCity && (
                            <div className="text-sm text-red-600 mt-1">{errors.senderCity}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Post Code</label>
                          <Field name="senderPostCode" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.senderPostCode && touched.senderPostCode && (
                            <div className="text-sm text-red-600 mt-1">{errors.senderPostCode}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Country</label>
                          <Field name="senderCountry" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.senderCountry && touched.senderCountry && (
                            <div className="text-sm text-red-600 mt-1">{errors.senderCountry}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bill To Fields */}
                    <div className="mb-6">
                      <h2 className="font-semibold mb-2 text-gray-800">Bill To</h2>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600">Client’s Name</label>
                        <Field name="clientName" className="w-full p-2 border border-gray-300 rounded" />
                        {errors.clientName && touched.clientName && (
                          <div className="text-sm text-red-600 mt-1">{errors.clientName}</div>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600">Client’s Email</label>
                        <Field name="clientEmail" type="email" className="w-full p-2 border border-gray-300 rounded" />
                        {errors.clientEmail && touched.clientEmail && (
                          <div className="text-sm text-red-600 mt-1">{errors.clientEmail}</div>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600">Street Address</label>
                        <Field name="clientStreet" className="w-full p-2 border border-gray-300 rounded" />
                        {errors.clientStreet && touched.clientStreet && (
                          <div className="text-sm text-red-600 mt-1">{errors.clientStreet}</div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">City</label>
                          <Field name="clientCity" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.clientCity && touched.clientCity && (
                            <div className="text-sm text-red-600 mt-1">{errors.clientCity}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Post Code</label>
                          <Field name="clientPostCode" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.clientPostCode && touched.clientPostCode && (
                            <div className="text-sm text-red-600 mt-1">{errors.clientPostCode}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Country</label>
                          <Field name="clientCountry" className="w-full p-2 border border-gray-300 rounded" />
                          {errors.clientCountry && touched.clientCountry && (
                            <div className="text-sm text-red-600 mt-1">{errors.clientCountry}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Description and Item List */}
                    <div className="mb-6">
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600">Project Description</label>
                        <Field
                          name="description"
                          placeholder="e.g. Graphic Design Service"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.description && touched.description && (
                          <div className="text-sm text-red-600 mt-1">{errors.description}</div>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Item List</h3>
                      <FieldArray name="items">
                        {({ push, remove }) => (
                          <div>
                            {values.items.map((item, index) => (
                              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                                <Field name={`items[${index}].itemName`} className="p-2 border border-gray-300 rounded" />
                                <Field name={`items[${index}].quantity`} type="number" className="p-2 border border-gray-300 rounded" />
                                <Field name={`items[${index}].price`} type="number" className="p-2 border border-gray-300 rounded" />
                                <button
                                  type="button"
                                  className="self-center px-2 py-1"
                                  onClick={() => remove(index)}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              className=" bg-zinc-50 hover:bg-slate-400 rounded-2xl px-60 py-2 justify-center"
                              onClick={() => push({ itemName: "", quantity: 1, price: 0 })}
                            >
                              + Add New Item
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-violet-400 text-white rounded-md px-4 py-2">
                      Save & Send
                    </button>
                    <button type="button" className="ml-4 bg-gray-300 text-gray-700 rounded-md px-4 py-2" onClick={handleCloseModal}>
                      Discard
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
