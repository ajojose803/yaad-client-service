"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  eventName: Yup.string()
    .min(2, "Event name must be at least 2 characters")
    .required("Event name is required"),
  eventType: Yup.string().required("Event type is required"),
  date: Yup.string().required("Date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  venueName: Yup.string()
    .min(2, "Venue name must be at least 2 characters")
    .optional(),
  venueLocation: Yup.string()
    .url("Please enter a valid URL")
    .optional(),
  description: Yup.string().required("Description is required"),
  dressCode: Yup.string().required("Dress code is required"),
  totalGuests: Yup.number()
    .typeError("Must be a number")
    .required("Total number of guests is required"),
  specialRequirements: Yup.string(),
});

export default function NewEventPage() {
  const router = useRouter();
  const eventTypes = [
    "Wedding", "Birthday", "Corporate", "Anniversary",
    "Graduation", "Holiday", "Other"
  ];

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const totalGuests = parseInt(values.totalGuests);
      
      // If total guests > 100, redirect to payment page
      if (totalGuests > 100) {
        // Store form data in localStorage or state management before redirect
        localStorage.setItem('pendingEventData', JSON.stringify(values));
        router.push('/payment'); // Adjust the path to your payment page
      } else {
        // Handle normal event creation
        console.log('Creating event:', values);
        // Add your event creation logic here
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto p-6 max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Unforgettable Event
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your vision into reality. Whether it's a cozy gathering or a grand celebration,
            let's make it extraordinary together.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <Formik
            initialValues={{
              eventName: "",
              eventType: "",
              date: "",
              startTime: "",
              endTime: "",
              venueName: "",
              venueLocation: "",
              description: "",
              dressCode: "",
              totalGuests: "",
              specialRequirements: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                {/* Event Details Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name of the Event
                      </label>
                      <Field
                        id="eventName"
                        name="eventName"
                        placeholder="Enter event name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      />
                      <ErrorMessage name="eventName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                          Event Type
                        </label>
                        <Field
                          as="select"
                          id="eventType"
                          name="eventType"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                        >
                          <option value="">Select event type</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="eventType" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <Field
                          id="date"
                          name="date"
                          type="date"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                        />
                        <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <Field
                          id="startTime"
                          name="startTime"
                          type="time"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                        />
                        <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <Field
                          id="endTime"
                          name="endTime"
                          type="time"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                        />
                        <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue Section */}
                <div className="space-y-6 pt-6 border-t">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Venue Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 mb-1">
                        Venue Name
                      </label>
                      <Field
                        id="venueName"
                        name="venueName"
                        placeholder="Enter venue name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      />
                      <ErrorMessage name="venueName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="venueLocation" className="block text-sm font-medium text-gray-700 mb-1">
                        Venue Location Link
                      </label>
                      <Field
                        id="venueLocation"
                        name="venueLocation"
                        placeholder="Enter location URL"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      />
                      <ErrorMessage name="venueLocation" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Additional Details Section */}
                <div className="space-y-6 pt-6 border-t">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Details</h2>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Tell your guests what to expect..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="dressCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Dress Code
                      </label>
                      <Field
                        id="dressCode"
                        name="dressCode"
                        placeholder="e.g., Formal, Casual, Black Tie"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      />
                      <ErrorMessage name="dressCode" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="totalGuests" className="block text-sm font-medium text-gray-700 mb-1">
                        Total Guests
                      </label>
                      <Field
                        id="totalGuests"
                        name="totalGuests"
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      />
                      <ErrorMessage name="totalGuests" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements/Notes
                    </label>
                    <Field
                      as="textarea"
                      id="specialRequirements"
                      name="specialRequirements"
                      rows={3}
                      placeholder="Any special instructions for guests..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                    />
                    <ErrorMessage name="specialRequirements" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-black/90 transition duration-200"
                >
                  {isSubmitting ? "Processing..." : "Create Your Event"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

