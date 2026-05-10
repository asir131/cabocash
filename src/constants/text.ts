export const languageOptions = [
  { code: "pt", title: "Português", subtitle: "Português", flag: "🇵🇹" },
  { code: "en", title: "English", subtitle: "English", flag: "🇺🇸" }
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

type TranslationKey =
  | "tabs.home"
  | "tabs.transactions"
  | "tabs.contacts"
  | "tabs.profile"
  | "home.greeting"
  | "home.balanceLabel"
  | "home.details"
  | "home.send"
  | "home.request"
  | "home.topup"
  | "home.recent"
  | "home.seeAll"
  | "balanceDetails.title"
  | "balanceDetails.availableBalance"
  | "balanceDetails.totalSent"
  | "balanceDetails.pendingRequest"
  | "balanceDetails.topUpTotal"
  | "balanceDetails.transactionHistory"
  | "topUp.title"
  | "topUp.subtitle"
  | "send.title"
  | "send.to"
  | "send.phonePlaceholder"
  | "send.chooseContact"
  | "send.selectFromContacts"
  | "send.contactPickerTitle"
  | "send.contactsLoading"
  | "send.noContacts"
  | "send.contactsPermissionTitle"
  | "send.contactsPermissionMessage"
  | "send.contactsErrorTitle"
  | "send.contactsErrorMessage"
  | "send.amount"
  | "send.messageLabel"
  | "send.messagePlaceholder"
  | "send.continue"
  | "send.alertTitle"
  | "send.alertMessage"
  | "request.title"
  | "request.heading"
  | "request.subtitle"
  | "request.button"
  | "requestForm.title"
  | "requestForm.phoneLabel"
  | "requestForm.phonePlaceholder"
  | "requestForm.amountLabel"
  | "requestForm.amountPlaceholder"
  | "requestForm.button"
  | "requestForm.alertTitle"
  | "requestForm.alertMessage"
  | "transactions.title"
  | "contacts.title"
  | "profile.title"
  | "profile.language"
  | "profile.security"
  | "profile.help"
  | "profile.logout"
  | "profile.languagePrompt"
  | "scan.title"
  | "scan.text"
  | "scan.send"
  | "scan.request"
  | "tx.sentJoao"
  | "tx.receivedAna"
  | "tx.sentPedro"
  | "tx.sentNew"
  | "tx.requestSent"
  | "tx.today1030"
  | "tx.yesterday1845"
  | "tx.may12"
  | "tx.now";

export const labels: Record<LanguageCode, Record<TranslationKey, string>> = {
  pt: {
    "tabs.home": "Início",
    "tabs.transactions": "Transações",
    "tabs.contacts": "Contactos",
    "tabs.profile": "Perfil",
    "home.greeting": "Olá, Maria! 👋",
    "home.balanceLabel": "Saldo Disponível",
    "home.details": "Ver detalhes",
    "home.send": "Enviar",
    "home.request": "Pedir",
    "home.topup": "Carregar",
    "home.recent": "Transações Recentes",
    "home.seeAll": "Ver tudo",
    "balanceDetails.title": "Detalhes do saldo",
    "balanceDetails.availableBalance": "Saldo disponivel",
    "balanceDetails.totalSent": "Total enviado",
    "balanceDetails.pendingRequest": "Pedidos pendentes",
    "balanceDetails.topUpTotal": "Total carregado",
    "balanceDetails.transactionHistory": "Historico de transacoes",
    "topUp.title": "Carregar saldo",
    "topUp.subtitle": "Escolha uma forma de carregar a sua conta.",
    "send.title": "Enviar Dinheiro",
    "send.to": "Para",
    "send.phonePlaceholder": "Número de telemóvel",
    "send.chooseContact": "Escolher contacto",
    "send.selectFromContacts": "Escolher dos contactos",
    "send.contactPickerTitle": "Contactos",
    "send.contactsLoading": "A carregar contactos...",
    "send.noContacts": "Nenhum contacto com número encontrado.",
    "send.contactsPermissionTitle": "Permissão necessária",
    "send.contactsPermissionMessage": "Permita o acesso aos contactos para escolher um número guardado.",
    "send.contactsErrorTitle": "Contactos indisponíveis",
    "send.contactsErrorMessage": "Não foi possível carregar os contactos do telemóvel.",
    "send.amount": "Montante",
    "send.messageLabel": "Motivo (opcional)",
    "send.messagePlaceholder": "Escreva uma mensagem...",
    "send.continue": "Continuar",
    "send.alertTitle": "Campos obrigatórios",
    "send.alertMessage": "Preencha o número de telemóvel e o montante.",
    "request.title": "Pedir Dinheiro",
    "request.heading": "Pedir ajuda é rápido e fácil!",
    "request.subtitle": "Peça dinheiro a um amigo ou familiar em poucos cliques.",
    "request.button": "Pedir Agora",
    "requestForm.title": "Pedir Dinheiro",
    "requestForm.phoneLabel": "Para",
    "requestForm.phonePlaceholder": "Número de telemóvel",
    "requestForm.amountLabel": "Montante",
    "requestForm.amountPlaceholder": "0 CVE",
    "requestForm.button": "Enviar Pedido",
    "requestForm.alertTitle": "Campos obrigatórios",
    "requestForm.alertMessage": "Preencha o número de telemóvel e o montante.",
    "transactions.title": "Transações",
    "contacts.title": "Contactos",
    "profile.title": "Perfil",
    "profile.language": "Língua / Idioma",
    "profile.security": "Segurança",
    "profile.help": "Ajuda",
    "profile.logout": "Sair",
    "profile.languagePrompt": "Escolha o idioma",
    "scan.title": "Ação Rápida",
    "scan.text": "Escolha uma operação para simular na Cabocash MVP.",
    "scan.send": "Enviar Dinheiro",
    "scan.request": "Pedir Dinheiro",
    "tx.sentJoao": "Enviado para João",
    "tx.receivedAna": "Recebido de Ana",
    "tx.sentPedro": "Enviado para Pedro",
    "tx.sentNew": "Enviado para novo contacto",
    "tx.requestSent": "Pedido enviado",
    "tx.today1030": "Hoje, 10:30",
    "tx.yesterday1845": "Ontem, 18:45",
    "tx.may12": "12 Mai, 09:15",
    "tx.now": "Agora mesmo"
  },
  en: {
    "tabs.home": "Home",
    "tabs.transactions": "Transactions",
    "tabs.contacts": "Contacts",
    "tabs.profile": "Profile",
    "home.greeting": "Hi, Maria! 👋",
    "home.balanceLabel": "Available Balance",
    "home.details": "View details",
    "home.send": "Send",
    "home.request": "Request",
    "home.topup": "Top Up",
    "home.recent": "Recent Transactions",
    "home.seeAll": "See all",
    "balanceDetails.title": "Balance Details",
    "balanceDetails.availableBalance": "Available balance",
    "balanceDetails.totalSent": "Total sent",
    "balanceDetails.pendingRequest": "Pending request money",
    "balanceDetails.topUpTotal": "Top up total",
    "balanceDetails.transactionHistory": "Transaction history",
    "topUp.title": "Top Up",
    "topUp.subtitle": "Choose a way to add money to your account.",
    "send.title": "Send Money",
    "send.to": "To",
    "send.phonePlaceholder": "Mobile number",
    "send.chooseContact": "Choose contact",
    "send.selectFromContacts": "Choose from contacts",
    "send.contactPickerTitle": "Contacts",
    "send.contactsLoading": "Loading contacts...",
    "send.noContacts": "No contacts with phone numbers found.",
    "send.contactsPermissionTitle": "Permission required",
    "send.contactsPermissionMessage": "Allow contacts access to choose a saved phone number.",
    "send.contactsErrorTitle": "Contacts unavailable",
    "send.contactsErrorMessage": "Could not load contacts from this phone.",
    "send.amount": "Amount",
    "send.messageLabel": "Reason (optional)",
    "send.messagePlaceholder": "Write a message...",
    "send.continue": "Continue",
    "send.alertTitle": "Required fields",
    "send.alertMessage": "Enter a mobile number and amount.",
    "request.title": "Request Money",
    "request.heading": "Requesting help is quick and easy!",
    "request.subtitle": "Ask a friend or family member for money in a few clicks.",
    "request.button": "Request Now",
    "requestForm.title": "Request Money",
    "requestForm.phoneLabel": "To",
    "requestForm.phonePlaceholder": "Mobile number",
    "requestForm.amountLabel": "Amount",
    "requestForm.amountPlaceholder": "0 CVE",
    "requestForm.button": "Send Request",
    "requestForm.alertTitle": "Required fields",
    "requestForm.alertMessage": "Enter a mobile number and amount.",
    "transactions.title": "Transactions",
    "contacts.title": "Contacts",
    "profile.title": "Profile",
    "profile.language": "Language",
    "profile.security": "Security",
    "profile.help": "Help",
    "profile.logout": "Log out",
    "profile.languagePrompt": "Choose your language",
    "scan.title": "Quick Action",
    "scan.text": "Choose an operation to simulate in the Cabocash MVP.",
    "scan.send": "Send Money",
    "scan.request": "Request Money",
    "tx.sentJoao": "Sent to João",
    "tx.receivedAna": "Received from Ana",
    "tx.sentPedro": "Sent to Pedro",
    "tx.sentNew": "Sent to new contact",
    "tx.requestSent": "Request sent",
    "tx.today1030": "Today, 10:30",
    "tx.yesterday1845": "Yesterday, 18:45",
    "tx.may12": "May 12, 09:15",
    "tx.now": "Just now"
  }
};

export type { TranslationKey };
