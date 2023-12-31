import { useMediaQuery, Theme } from "@mui/material";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    useRecordContext,
    ReferenceInput,
    NumberInput
} from "react-admin";
import { inputAttributes, validateEnterprise, validateName, validatePhone, validateEmail} from './inputAttributes';


const clientFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="clients" label="Clients" reference="clients" />,
];

export const ClientList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={clientFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.enterprise}
                    tertiaryText={(record) => record.email}
                    secondaryText={(record) => record.phone}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="enterprise" />
                    <TextField source="firstname" />
                    <TextField source="lastname" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

const ClientTitle = () => {
    const record = useRecordContext();
    return <span> Profil {record ? `"${record.enterprise}"` : ''}</span>;
};

export const ClientEdit = () => (
    <Edit title={<ClientTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="enterprise" validate={validateEnterprise} title={inputAttributes.title.enterprise} />
            <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
            <NumberInput source="phone" validate={validatePhone} title={inputAttributes.title.phone} />
        </SimpleForm>
    </Edit>
);

export const ClientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="enterprise" validate={validateEnterprise} title={inputAttributes.title.enterprise} />
            <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
            <NumberInput source="phone" validate={validatePhone} title={inputAttributes.title.phone} />
        </SimpleForm>
    </Create>
);