import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { Image, Linking, Text, View } from "react-native";
import styled from "styled-components/native";
import BackgroundGradient from "../components/BackgroundGradient";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Grid } from "../components/Grid";
import { Layout } from "../components/Layout";
import { TextField } from "../components/TextField";
import { RootStack } from "../navigation/AppNavigator";
import { useAppStore } from "../store/appStore";

const Badge = styled.Text`
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 999px;
  background: #22c55e;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 8px;
  line-height: 40px;
  max-width: 352px;
`;

const Subtitle = styled.Text`
  color: #03050f;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 15px;
  max-width: 352px;
  font-weight: 600;
`;

const MobileTitle = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 8px;
  line-height: 36px;
`;

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStack, "Home">) {
  const { dni, celular, aceptaPP, aceptaMkt, set } = useAppStore();

  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [loading, setLoading] = useState(false);

  const dniError = useMemo(() => {
    if (!dni) return undefined;
    return /^\d{8}$/.test(dni) ? undefined : "Debe tener 8 dígitos";
  }, [dni]);

  const celError = useMemo(() => {
    if (!celular) return undefined;
    return /^9\d{8}$/.test(celular)
      ? undefined
      : "Empieza en 9 y tiene 9 dígitos";
  }, [celular]);

  const ready = !!dni && !dniError && !!celular && !celError && !!aceptaPP;

  async function onSubmit() {
    try {
      setLoading(true);
      navigation.navigate("SummaryFinish", { quoteId: "123456" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const left = (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 24,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        width: 480,
        height: 560,
      }}
    >
      <Image
        source={require("../../assets/images/family.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );

  const right = (
    <View style={{ width: 352 }}>
      <Badge>Seguro Salud Flexible</Badge>
      <Title>Creado para ti y tu familia</Title>
      <Subtitle>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </Subtitle>

      <View style={{ gap: 10 }}>
        <TextField
          label="DNI"
          showDropdown={true}
          dropdownOptions={[
            { label: "DNI", value: "dni" },
            { label: "CE", value: "ce" },
            { label: "Pasaporte", value: "pasaporte" },
          ]}
          selectedDropdownValue={tipoDocumento}
          onDropdownChange={setTipoDocumento}
          placeholderText="Nro. de documento"
          keyboardType="number-pad"
          maxLength={8}
          value={dni}
          onChangeText={(t) => set({ dni: t.replace(/\D/g, "").slice(0, 8) })}
          error={dniError}
        />

        <TextField
          label="Celular"
          placeholderText="Celular"
          keyboardType="phone-pad"
          maxLength={9}
          value={celular}
          onChangeText={(t) =>
            set({ celular: t.replace(/\D/g, "").slice(0, 9) })
          }
          error={celError}
        />

        <View style={{ gap: 12, marginTop: 8 }}>
          <Checkbox
            value={aceptaPP}
            onChange={(v) => set({ aceptaPP: v })}
            label={
              <Text style={{ fontSize: 12, color: "#03050f", lineHeight: 20 }}>
                Acepto lo{" "}
                <Text
                  style={{ color: "#2563EB", textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("#")}
                >
                  Política de Privacidad
                </Text>
              </Text>
            }
          />
          <Checkbox
            value={aceptaMkt}
            onChange={(v) => set({ aceptaMkt: v })}
            label={
              <Text style={{ fontSize: 12, color: "#03050f", lineHeight: 20 }}>
                Acepto la{" "}
                <Text
                  style={{ color: "#2563EB", textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("#")}
                >
                  Política Comunicaciones Comerciales
                </Text>
              </Text>
            }
          />
        </View>

        <Text
          style={{
            color: "#03050f",
            fontSize: 12,
            fontWeight: "600",
            textDecorationLine: "underline",
            marginTop: 4,
          }}
          onPress={() => Linking.openURL("#")}
        >
          Aplican Términos y Condiciones.
        </Text>

        <Button
          title={loading ? "Cargando..." : "Cotiza aquí"}
          disabled={!ready || loading}
          onPress={onSubmit}
        />
      </View>
    </View>
  );

  const top = (
    <View style={{ width: "100%" }}>
        <View 
        style={{ 
            flexDirection: "row", 
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 24 
        }}
        >
        <View 
            style={{ 
            flex: 1,
            paddingRight: 8,
            justifyContent: "center"
            }}
        >
            <Badge>Seguro Salud Flexible</Badge>
            <MobileTitle>Creado para ti y tu familia</MobileTitle>
        </View>

        <View 
            style={{ 
            width: 200,
            height: 193,
            flexShrink: 1,
            maxWidth: "40%",
            }}
        >
            <View
            style={{
                backgroundColor: "#ffffff",
                borderRadius: 20,
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
                width: "100%",
                height: "100%",
            }}
            >
            <Image
                source={require("../../assets/images/family.png")}
                resizeMode="cover"
                style={{
                width: "100%",
                height: "100%",
                }}
            />
            </View>
        </View>
        </View>
        
        <View 
        style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            width: "100%",
            marginBottom: 24
        }}
        />
    </View>
  );

  const bottom = (
    <View style={{ width: "100%" }}>
      <Subtitle style={{ maxWidth: "100%", marginBottom: 24 }}>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </Subtitle>

      <View style={{ gap: 16 }}>
        <TextField
          label="DNI"
          showDropdown={true}
          dropdownOptions={[
            { label: "DNI", value: "dni" },
            { label: "CE", value: "ce" },
            { label: "Pasaporte", value: "pasaporte" },
          ]}
          selectedDropdownValue={tipoDocumento}
          onDropdownChange={setTipoDocumento}
          placeholderText="Nro. de documento"
          keyboardType="number-pad"
          maxLength={8}
          value={dni}
          onChangeText={(t) => set({ dni: t.replace(/\D/g, "").slice(0, 8) })}
          error={dniError}
        />

        <TextField
          label="Celular"
          placeholderText="Celular"
          keyboardType="phone-pad"
          maxLength={9}
          value={celular}
          onChangeText={(t) =>
            set({ celular: t.replace(/\D/g, "").slice(0, 9) })
          }
          error={celError}
        />

        <View style={{ gap: 12, marginTop: 8 }}>
          <Checkbox
            value={aceptaPP}
            onChange={(v) => set({ aceptaPP: v })}
            label={
              <Text style={{ fontSize: 12, color: "#03050f", lineHeight: 20 }}>
                Acepto la{" "}
                <Text
                  style={{ color: "#2563EB", textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("#")}
                >
                  Política de Privacidad
                </Text>
              </Text>
            }
          />
          <Checkbox
            value={aceptaMkt}
            onChange={(v) => set({ aceptaMkt: v })}
            label={
              <Text style={{ fontSize: 12, color: "#03050f", lineHeight: 20 }}>
                Acepto la{" "}
                <Text
                  style={{ color: "#2563EB", textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("#")}
                >
                  Política Comunicaciones Comerciales
                </Text>
              </Text>
            }
          />
        </View>

        <Text
          style={{
            color: "#03050f",
            fontSize: 12,
            fontWeight: "600",
            textDecorationLine: "underline",
            marginTop: 4,
          }}
          onPress={() => Linking.openURL("#")}
        >
          Aplican Términos y Condiciones.
        </Text>

        <Button
          title={loading ? "Cargando..." : "Cotiza aquí"}
          disabled={!ready || loading}
          onPress={onSubmit}
        />
      </View>
    </View>
  );

  return (
    <Layout background={<BackgroundGradient />}>
      <Grid left={left} right={right} top={top} bottom={bottom} />
    </Layout>
  );
}