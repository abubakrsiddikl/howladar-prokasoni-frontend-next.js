"use client";
import { useState, useMemo } from "react";
import bdLocation from "@/data/bd-location.json";

export interface LocationData {
  divisions: string[];
  districts: string[];
  cities: string[];
  setDivision: (division: string) => void;
  setDistrict: (district: string) => void;
  selectedDivision: string;
  selectedDistrict: string;
}

const shippingData = bdLocation.shippingInfo;

export const useLocationData = (): LocationData => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const divisions = shippingData.map((item) => item.divisionName);

  const districts = useMemo(() => {
    if (!selectedDivision) {
      return [];
    }
    const division = shippingData.find(
      (d) => d.divisionName === selectedDivision
    );
    return division ? division.districts.map((d) => d.districtName) : [];
  }, [selectedDivision]);
  const cities = useMemo(() => {
    if (!selectedDistrict || !selectedDivision) {
      return [];
    }

    const division = shippingData.find(
      (d) => d.divisionName === selectedDivision
    );
    const district = division?.districts.find(
      (dist) => dist.districtName === selectedDistrict
    );

    return district ? district.upazilas : [];
  }, [selectedDivision, selectedDistrict]);

  const setDivision = (division: string) => {
    setSelectedDivision(division);

    setSelectedDistrict("");
  };

  return {
    divisions,
    districts,
    cities,
    setDivision,
    setDistrict: setSelectedDistrict,
    selectedDivision,
    selectedDistrict,
  };
};
