import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Badge } from "../components/atoms/Badge";
import { Subtitle, Title } from "../components/atoms/Typography";
import BackgroundGradient from "../components/BackgroundGradient";
import { Grid } from "../components/Grid";
import { Layout } from "../components/Layout";
import { FamilyImageCard } from "../components/molecules/FamilyImageCard";
import { MobileHeader } from "../components/organisms/MobileHeader";
import { QuoteForm } from "../components/organisms/QuoteForm";
import { RootStack } from "../navigation/AppNavigator";
import { useAppStore } from "../store/appStore";

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

  const handleDniChange = (text: string) => {
    set({ dni: text.replace(/\D/g, "").slice(0, 8) });
  };

  const handleCelularChange = (text: string) => {
    set({ celular: text.replace(/\D/g, "").slice(0, 9) });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      navigation.navigate("SummaryFinish", { quoteId: "123456" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const left = <FamilyImageCard width={480} height={560} />;

  const right = (
    <View style={{ width: 352 }}>
      <Badge>Seguro Salud Flexible</Badge>
      <Title>Creado para ti y tu familia</Title>
      <Subtitle>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </Subtitle>
      <View style={{ gap: 10 }}>
        <QuoteForm
          tipoDocumento={tipoDocumento}
          setTipoDocumento={setTipoDocumento}
          dni={dni}
          handleDniChange={handleDniChange}
          dniError={dniError}
          celular={celular}
          handleCelularChange={handleCelularChange}
          celError={celError}
          aceptaPP={aceptaPP}
          setAceptaPP={(v) => set({ aceptaPP: v })}
          aceptaMkt={aceptaMkt}
          setAceptaMkt={(v) => set({ aceptaMkt: v })}
          loading={loading}
          ready={ready}
          onSubmit={handleSubmit}
          gap={10}
        />
      </View>
    </View>
  );

  const top = <MobileHeader />;

  const bottom = (
    <View style={{ width: "100%" }}>
      <Subtitle style={{ maxWidth: "100%", marginBottom: 24 }}>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </Subtitle>
      <QuoteForm
        tipoDocumento={tipoDocumento}
        setTipoDocumento={setTipoDocumento}
        dni={dni}
        handleDniChange={handleDniChange}
        dniError={dniError}
        celular={celular}
        handleCelularChange={handleCelularChange}
        celError={celError}
        aceptaPP={aceptaPP}
        setAceptaPP={(v) => set({ aceptaPP: v })}
        aceptaMkt={aceptaMkt}
        setAceptaMkt={(v) => set({ aceptaMkt: v })}
        loading={loading}
        ready={ready}
        onSubmit={handleSubmit}
      />
    </View>
  );

  return (
    <Layout background={<BackgroundGradient />}>
      <Grid left={left} right={right} top={top} bottom={bottom} />
    </Layout>
  );
}