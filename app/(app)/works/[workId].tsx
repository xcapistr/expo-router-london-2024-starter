import { View, Text, ScrollView, Pressable, Platform } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useWorkByIdQuery } from '@/data/hooks/useWorkByIdQuery'
import { useFavStatusQuery } from '@/data/hooks/useFavStatusQuery'
import { useFavStatusMutation } from '@/data/hooks/useFavStatusMutation'
import colors from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LoadingShade } from '@/components/LoadingShade'
import { stripTags } from '@/lib/utils'
import classNames from 'classnames'

export default function WorkScreen() {
  const { workId } = useLocalSearchParams<{
    workId: string
  }>()
  const insets = useSafeAreaInsets()

  // query art API for the work
  const workQuery = useWorkByIdQuery(workId)
  const work = workQuery.data

  // read fav status
  const favQuery = useFavStatusQuery(workId)
  const isFav = favQuery.data

  // update fav status
  const favMutation = useFavStatusMutation()

  return (
    <View
      className={classNames(
        'bg-white sm:bg-black',
        'sm:bg-opacity-20',
        'flex-1 justify-center',
        Platform.OS === 'android' && 'pt-safe'
      )}
    >
      <View className="sm:my-20 sm:w-3/4 sm:self-center flex-1">
        <View className="flex-row align-middle justify-between bg-white px-4 py-4 border-b border-b-shade-2">
          <View className="justify-center px-2">
            <Pressable
              onPress={() => {
                router.back()
              }}
              className="justify-center items-middle"
            >
              <Icon name="close" size={28} />
            </Pressable>
          </View>
          <View className="justify-center px-4">
            <Pressable
              className="active:opacity-50"
              disabled={favQuery.isLoading || favMutation.isPending}
              onPress={() => {
                favMutation.mutate({ workId, status: !isFav })
              }}
            >
              <Icon
                name={isFav ? 'star' : 'star-border'}
                color={colors.tint}
                size={28}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          contentContainerClassName="bg-white"
        >
          <View className="flex-1">
            <View className="py-4 px-4 h-96 w-96 self-center">
              <Image
                className="flex-1"
                source={{ uri: work && work.images.web.url }}
                contentFit="contain"
                transition={500}
              />
            </View>
            <Text className="font-semibold text-3xl px-4 pt-2">
              {work?.title}
            </Text>
            <View className="flex-1">
              <View className="px-4 gap-y-2 py-2">
                {work?.creators.length ? (
                  <Text className="text-lg italic font-light mb-2">
                    {work.creators[0].description}
                  </Text>
                ) : null}
                <View className="flex-row gap-2 flex-wrap">
                  <View className="bg-tint-2 px-4 py-2 self-start">
                    <Text className="text-l font-bold">{work?.date_text}</Text>
                  </View>
                  {work?.technique.split(',').map((item: string) => (
                    <View className="bg-tint px-4 py-2 self-start" key={item}>
                      <Text className="text-l font-bold text-white whitespace-nowrap line-clamp-1">
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              {work?.description && (
                <>
                  <Text className="text-xl font-semibold px-4 py-2">
                    Description
                  </Text>
                  <View className="px-4 gap-y-2 pb-2">
                    <Text className="text-lg leading-6 font-light">
                      {stripTags(work.description)}
                    </Text>
                  </View>
                </>
              )}
              {work?.did_you_know && (
                <>
                  <Text className="text-xl font-semibold px-4 py-2">
                    Did you know?
                  </Text>
                  <View className="px-4 gap-y-2 py-2">
                    <Text className="text-lg leading-6 font-light">
                      {stripTags(work.did_you_know)}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
        <LoadingShade isLoading={workQuery.isLoading || favQuery.isLoading} />
      </View>
    </View>
  )
}
