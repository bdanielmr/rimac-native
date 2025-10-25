import React from "react";
import { Linking, View } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { PolicyCheckbox } from "../molecules/PolicyCheckbox";

const TermsText = styled.Text`
  color: #03050f;
  font-size: 12px;
  font-weight: 600;
  text-decoration-line: underline;
  margin-top: 4px;
`;

const DOCUMENT_OPTIONS = [
  { label: "DNI", value: "dni" },
  { label: "CE", value: "ce" },
  { label: "Pasaporte", value: "pasaporte" },
];

interface QuoteFormProps {
  tipoDocumento: string;
  setTipoDocumento: (value: string) => void;
  dni: string;
  handleDniChange: (text: string) => void;
  dniError?: string;
  celular: string;
  handleCelularChange: (text: string) => void;
  celError?: string;
  aceptaPP: boolean;
  setAceptaPP: (value: boolean) => void;
  aceptaMkt: boolean;
  setAceptaMkt: (value: boolean) => void;
  loading: boolean;
  ready: boolean;
  onSubmit: () => void;
  gap?: number;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  tipoDocumento,
  setTipoDocumento,
  dni,
  handleDniChange,
  dniError,
  celular,
  handleCelularChange,
  celError,
  aceptaPP,
  setAceptaPP,
  aceptaMkt,
  setAceptaMkt,
  loading,
  ready,
  onSubmit,
  gap = 16,
}) => (
  <View style={{ gap }}>
    <TextField
      label="DNI"
      showDropdown
      dropdownOptions={DOCUMENT_OPTIONS}
      selectedDropdownValue={tipoDocumento}
      onDropdownChange={setTipoDocumento}
      placeholderText="Nro. de documento"
      keyboardType="number-pad"
      maxLength={8}
      value={dni}
      onChangeText={handleDniChange}
      error={dniError}
    />

    <TextField
      label="Celular"
      placeholderText="Celular"
      keyboardType="phone-pad"
      maxLength={9}
      value={celular}
      onChangeText={handleCelularChange}
      error={celError}
    />

    <View style={{ gap: 12, marginTop: 8 }}>
      <PolicyCheckbox
        value={aceptaPP}
        onChange={setAceptaPP}
        text="Acepto la"
        linkText="Política de Privacidad"
        linkUrl="#"
      />
      <PolicyCheckbox
        value={aceptaMkt}
        onChange={setAceptaMkt}
        text="Acepto la"
        linkText="Política Comunicaciones Comerciales"
        linkUrl="#"
      />
    </View>

    <TermsText onPress={() => Linking.openURL("#")}>
      Aplican Términos y Condiciones.
    </TermsText>

    <Button
      title={loading ? "Cargando..." : "Cotiza aquí"}
      disabled={!ready || loading}
      onPress={onSubmit}
    />
  </View>
);