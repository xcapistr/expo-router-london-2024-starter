import colors from '@/constants/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { TabTriggerSlotProps } from 'expo-router/build/ui'
import { ComponentProps, Ref, forwardRef } from 'react'
import { Text, Pressable, View } from 'react-native'

type Icon = ComponentProps<typeof MaterialIcons>['name']

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon
}

export const TabButton = forwardRef(function TabButtonComponent(
  { icon, children, isFocused, ...props }: TabButtonProps,
  ref: Ref<View>
) {
  return (
    <Pressable
      ref={ref}
      {...props}
      className={isFocused ? ' sm:border-b-tint sm:border-b-2' : ''}
    >
      <View className="justify-between items-center gap-y-1 px-2 flex-col">
        <MaterialIcons
          color={isFocused ? colors.tint : colors.black}
          name={icon}
          size={24}
          className="sm:hidden"
        />
        <Text
          className={
            'text-sm sm:text-lg' +
            (isFocused ? ' color-tint sm:color-black' : '')
          }
        >
          {children}
        </Text>
      </View>
    </Pressable>
  )
})
