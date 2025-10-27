import React, { useMemo } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useCarousel } from "../../hooks/useCarousel";
import { PlanCard } from "./PlanCard";

type Plan = {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  cost: number;
  costBefore?: number;
  benefits: string[];
};

const PagerBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

const CircleButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${({ disabled }: any) => (disabled ? "#CBD5E1" : "#4338CA")};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: any) => (disabled ? 0.5 : 1)};
`;

const PagerText = styled.Text`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

interface Props {
  plans: Plan[];
  onSelect: (id: string) => void;
}

export const PlanCarousel: React.FC<Props> = ({ plans, onSelect }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const SIDE = 24;
  const GAP = 32;
  const PEEK = 24;

  const cardWidth = useMemo(
    () => Math.min(320, Math.max(288, width - SIDE * 2 - PEEK)),
    [width]
  );

  const {
    scrollRef,
    index,
    offsets,
    handleScroll,
    handleScrollBeginDrag,
    handleMomentumEnd,
    canGoPrev,
    canGoNext,
    goToPrev,
    goToNext,
  } = useCarousel({
    itemCount: plans.length,
    cardWidth,
    gap: GAP,
    isEnabled: !isDesktop,
  });

  // Desktop: grilla estática
  if (isDesktop) {
    return (
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          {plans.map((plan) => (
            <View key={plan.id} style={{ width: 320, maxWidth: 360 }}>
              <PlanCard
                name={plan.name}
                icon={plan.icon}
                badge={plan.badge}
                cost={plan.cost}
                costBefore={plan.costBefore}
                benefits={plan.benefits}
                onSelect={() => onSelect(plan.id)}
                cardWidth={288}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToOffsets={Platform.OS !== "web" ? offsets : undefined}
        snapToAlignment={Platform.OS !== "web" ? "start" : undefined}
        contentContainerStyle={{
          paddingLeft: SIDE,
          paddingRight: SIDE + PEEK,
          paddingVertical: 8,
        }}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumEnd}
        scrollEventThrottle={16}
      >
        {plans.map((plan, i) => (
          <View
            key={plan.id}
            style={{
              width: cardWidth,
              marginRight: i === plans.length - 1 ? 0 : GAP,
              ...(Platform.OS === "web" ? ({ scrollSnapAlign: "start" } as any) : {}),
            }}
          >
            <PlanCard
              name={plan.name}
              icon={plan.icon}
              badge={plan.badge}
              cost={plan.cost}
              costBefore={plan.costBefore}
              benefits={plan.benefits}
              onSelect={() => onSelect(plan.id)}
              cardWidth={cardWidth}
            />
          </View>
        ))}
      </ScrollView>

      <PagerBar>
        <CircleButton activeOpacity={0.7} disabled={!canGoPrev} onPress={goToPrev}>
          <Text style={{ fontSize: 18, color: !canGoPrev ? "#CBD5E1" : "#4338CA" }}>
            ‹
          </Text>
        </CircleButton>

        <PagerText>{`${index + 1} / ${plans.length}`}</PagerText>

        <CircleButton activeOpacity={0.7} disabled={!canGoNext} onPress={goToNext}>
          <Text style={{ fontSize: 18, color: !canGoNext ? "#CBD5E1" : "#4338CA" }}>
            ›
          </Text>
        </CircleButton>
      </PagerBar>
    </View>
  );
};