"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const FormEntry = ({ onDataSubmitted }) => {
	const [formData, setFormData] = useState({
		patientName: "",
		patientId: "",
		treatmentDate: "",
		treatmentDescriptions: [],
		medications: [],
		cost: 0,
	});
	const [treatmentOptions, setTreatmentOptions] = useState([]);
	const [medicationOptions, setMedicationOptions] = useState([]);
	const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);
	const [medicationDropdownOpen, setMedicationDropdownOpen] = useState(false);
	const treatmentDropdownRef = useRef(null);
	const medicationDropdownRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOptions = async () => {
			setLoading(true);
			try {
				const treatmentsResponse = await fetch("/api/manage/treatments");
				const medicationsResponse = await fetch("/api/manage/medications");

				if (treatmentsResponse.ok && medicationsResponse.ok) {
					const treatmentsData = await treatmentsResponse.json();
					const medicationsData = await medicationsResponse.json();

					setTreatmentOptions(treatmentsData.treatments);
					setMedicationOptions(medicationsData.medications);
				} else {
					toast.error("Failed to fetch treatments or medications.");
				}
			} catch (error) {
				toast.error(`Failed to fetch options: ${error.message}`);
			} finally {
				setLoading(false);
			}
		};

		fetchOptions();
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevFormData) => {
			if (type === "checkbox") {
				const currentValues = prevFormData[name] || [];
				if (checked) {
					return { ...prevFormData, [name]: [...currentValues, value] };
				} else {
					return {
						...prevFormData,
						[name]: currentValues.filter((v) => v !== value),
					};
				}
			} else {
				if (name === "patientId") {
					return { ...prevFormData, [name]: value.toUpperCase() };
				} else {
					return { ...prevFormData, [name]: value };
				}
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		if (
			!formData.patientName ||
			!formData.patientId ||
			!formData.treatmentDate
		) {
			toast.error("Please fill in all required fields.");
			setIsSubmitting(false);
			return;
		}

		const finalFormData = {
			...formData,
			patientId: formData.patientId.toUpperCase(),
			treatmentDescriptions: [...formData.treatmentDescriptions].filter(
				(item) => item
			),
			medications: [...formData.medications].filter((item) => item),
		};

		try {
			const response = await fetch("/api/patient", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(finalFormData),
			});

			if (response.ok) {
				toast.success("Patient data saved successfully!");
				setFormData({
					patientName: "",
					patientId: "",
					treatmentDate: "",
					treatmentDescriptions: [],
					medications: [],
					cost: 0,
				});
				setIsSubmitting(false);
				onDataSubmitted();
			} else {
				const errorData = await response.json();
				toast.error(
					`Failed to save patient data: ${errorData.error || "Unknown error"}`
				);
				setIsSubmitting(false);
			}
		} catch (error) {
			toast.error(`Failed to save patient data: ${error.message}`);
			setIsSubmitting(false);
		}
	};

	const toggleTreatmentDropdown = () => {
		setTreatmentDropdownOpen(!treatmentDropdownOpen);
	};

	const toggleMedicationDropdown = () => {
		setMedicationDropdownOpen(!medicationDropdownOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				treatmentDropdownOpen &&
				treatmentDropdownRef.current &&
				!treatmentDropdownRef.current.contains(event.target)
			) {
				setTreatmentDropdownOpen(false);
			}
			if (
				medicationDropdownOpen &&
				medicationDropdownRef.current &&
				!medicationDropdownRef.current.contains(event.target)
			) {
				setMedicationDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [treatmentDropdownOpen, medicationDropdownOpen]);

	return (
		<div className="p-8 border border-base-300 rounded-xl shadow-md bg-white">
			<form
				onSubmit={handleSubmit}
				className={`space-y-6 ${isSubmitting && "opacity-60"}`}
			>
				<h1 className="text-zinc-700 text-2xl font-semibold">
					Patient Treatment Entry
				</h1>
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">
							Patient Name <span className="text-error">*</span>
						</span>

						<input
							type="text"
							name="patientName"
							value={formData.patientName}
							onChange={handleChange}
							className="input input-bordered w-full"
							placeholder="Patient name"
							required
						/>
					</label>
				</div>
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">
							Patient ID <span className="text-error">*</span>
						</span>

						<input
							type="text"
							name="patientId"
							value={formData.patientId}
							onChange={handleChange}
							className="input input-bordered w-full"
							placeholder="Patient ID"
							required
						/>
					</label>
				</div>
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">
							Date of Treatment<span className="text-error">*</span>
						</span>

						<input
							type="date"
							name="treatmentDate"
							value={formData.treatmentDate}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</label>
				</div>
				{/* Treatment */}
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">Treatment Description:</span>

						<div className="relative w-full " ref={treatmentDropdownRef}>
							<button
								type="button"
								className={`input input-bordered w-full text-left truncate cursor-pointer ${
									loading ? "cursor-not-allowed" : ""
								}`}
								onClick={loading ? null : toggleTreatmentDropdown}
								disabled={loading}
							>
								{loading
									? "Fetching data..."
									: formData.treatmentDescriptions.length > 0
									? formData.treatmentDescriptions.join(", ")
									: "Select Treatments"}
							</button>
							{treatmentDropdownOpen && !loading && (
								<ul className="absolute z-10 mt-1 w-full bg-base-100 rounded-box shadow max-h-64 overflow-auto">
									{treatmentOptions.length > 0 ? (
										treatmentOptions.map((option) => (
											<li key={option._id} className="p-2">
												<label className="flex items-center">
													<input
														type="checkbox"
														name="treatmentDescriptions"
														value={option.name}
														checked={formData.treatmentDescriptions.includes(
															option.name
														)}
														onChange={handleChange}
														className="checkbox"
														disabled={loading}
													/>
													<span className="ml-2">{option.name}</span>
												</label>
											</li>
										))
									) : (
										<li className="p-2 text-center">No treatments available</li>
									)}
								</ul>
							)}
						</div>
					</label>
				</div>
				{/* Medications */}
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">Medications Prescribed:</span>

						<div className="relative w-full" ref={medicationDropdownRef}>
							<button
								type="button"
								className={`input input-bordered w-full text-left truncate cursor-pointer ${
									loading ? "cursor-not-allowed" : ""
								}`}
								onClick={loading ? null : toggleMedicationDropdown}
								disabled={loading}
							>
								{loading
									? "Fetching data..."
									: formData.medications.length > 0
									? formData.medications.join(", ")
									: "Select Medications"}
							</button>
							{medicationDropdownOpen && !loading && (
								<ul className="absolute z-10 mt-1 w-full bg-base-100 rounded-box shadow max-h-64 overflow-auto">
									{medicationOptions.length > 0 ? (
										medicationOptions.map((option) => (
											<li key={option._id} className="p-2">
												<label className="flex items-center">
													<input
														type="checkbox"
														name="medications"
														value={option.name}
														checked={formData.medications.includes(option.name)}
														onChange={handleChange}
														className="checkbox"
														disabled={loading}
													/>
													<span className="ml-2">{option.name}</span>
												</label>
											</li>
										))
									) : (
										<li className="p-2 text-center">
											No medications available
										</li>
									)}
								</ul>
							)}
						</div>
					</label>
				</div>
				<div className="form-control">
					<label className="floating-label">
						<span className="label-text">Cost of Treatment (IDR):</span>

						<input
							type="number"
							step="0.01"
							name="cost"
							value={formData.cost}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
							min={0}
						/>
					</label>
				</div>
				<button type="submit" className="btn btn-primary w-full">
					{isSubmitting ? (
						<span className="loading loading-spinner loading-md"></span>
					) : (
						"Submit"
					)}
				</button>
			</form>
		</div>
	);
};
export default FormEntry;
