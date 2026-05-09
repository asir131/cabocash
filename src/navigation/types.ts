import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  SendMoney: undefined;
  RequestMoney: undefined;
  RequestMoneyForm: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  TransactionsTab: undefined;
  ScanTab: undefined;
  ContactsTab: undefined;
  ProfileTab: undefined;
};
