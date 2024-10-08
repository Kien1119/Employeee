import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Field, Form, ErrorMessage } from "vee-validate";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Listbox from "primevue/listbox";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import SelectButton from "primevue/selectbutton";
// import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import CascadeSelect from "primevue/cascadeselect";
import InputGroup from "primevue/inputgroup";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import Card from "primevue/card";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DataView from "primevue/dataview";
import ProgressSpinner from "primevue/progressspinner";
import Dropdown from "primevue/dropdown";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.component("InputText", InputText);
app.component("PasswordInput", Password);
app.component("SubmitButton", Button);
app.component("FloatLabel", FloatLabel);
app.component("ValidationField", Field);
app.component("ValidationForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.component("ListboxCheck", Listbox);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("SelectButton", SelectButton);
app.component("DataTable", DataTable);
app.component("TableColumn", Column);
app.component("TableDialog", Dialog);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("ListAccordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("CascadeSelect", CascadeSelect);
app.component("InputGroup", InputGroup);
app.component("BodyCard", Card);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmToast", Toast);
app.component("DataView", DataView);
app.component("ProgressSpinner", ProgressSpinner);
app.component("DropdownField", Dropdown);
app.use(ConfirmationService);
app.use(ToastService);
app.mount("#app");
