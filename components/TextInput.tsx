import {
  View,
  Text,
  StyleProp,
  TextInput as Input,
  TextInputBase,
} from "react-native";
import React, { ReactElement } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Control,
  Controller,
  FieldValues,
  useController,
} from "react-hook-form";

const TextInput: React.FC<{
  icon?: ReactElement;
  control?: Control<FieldValues>;
  name?: string;
  placeholder?: string;
  scureTextEntry?: boolean;
  errorMessage?: string;
}> = (props) => {
  const { field } = useController({
    name: props.name ?? "",
    control: props.control,
    defaultValue: "",
  });
  return (
    <>
      <View
        style={{ height: hp(7) }}
        className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
      >
        {props.icon}
        <Input
          {...props}
          style={{ fontSize: hp(2) }}
          className="flex-1 font-semibold text-neutral-700"
          placeholder={props.placeholder ?? ""}
          placeholderTextColor={"grey"}
          onChangeText={field.onChange}
          value={field.value}
          secureTextEntry={props.scureTextEntry ?? false}
        />
      </View>
      {props.errorMessage ? (
        <View className="px-4">
          <Text
            style={{ fontSize: hp(1.5), color: "rgb(239 68 68)" }}
            className="font-semibold tracking-wider"
          >
            {props.errorMessage}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default TextInput;
