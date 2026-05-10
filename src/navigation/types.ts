import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  BalanceDetails: undefined;
  TopUp: undefined;
  SendMoney: undefined;
  RequestMoney: undefined;
  RequestMoneyForm: undefined;
  ProfileInfo: { type: "security" | "help" };
};

export type TabParamList = {
  HomeTab: undefined;
  TransactionsTab: undefined;
  ScanTab: undefined;
  ContactsTab: undefined;
  ProfileTab: undefined;
};
