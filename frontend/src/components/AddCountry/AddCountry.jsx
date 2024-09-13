import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, InputNumber, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ADDCOUNTRY } from '../../../API/ApiService';
import dataFile from "../../../../backend/data.json"
import style from './AddCountry.module.scss'
import { GetAllCountries } from '../../Redux/Action';
import { useDispatch } from 'react-redux';


const AddCountryForm = ({setVisible}) => {
  const [form] = Form.useForm();
  const [countryName, setCountryName] = useState('');
  const [continent, setContinent] = useState('');
  const [rank, setRank] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
const dispatch =useDispatch()
  const handleFileChange = (info) => {
    const file = info.file;
    console.log(file);
    
    const isJpgOrPng = file.type == 'image/jpeg' || file.type === 'image/png';
    const isLt4M = file.size / 1024 / 1024 < 4;

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }

    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
      return;
    }

    setSelectedFile(file);
    setFileList([info.file]); 
    message.success(`${info.file.name} file uploaded successfully.`);
  };

  const handleSubmit = async (values) => {
    if (!selectedFile) {
      message.error('Please upload a valid image file');
      return;
    }

    
    const formData = new FormData();
    formData.append('flag', selectedFile);
    formData.append('country', JSON.stringify({
      name: values.countryName,
      continent: values.continent,
      rank: values.rank
    }));

    try {
      console.log({ formData });

      // Send the POST request to the server
      const response = await ADDCOUNTRY(formData);

      // const data = await response;
      message.success('Country added successfully');
      console.log('Country added successfully:', response.data);
      dispatch(GetAllCountries(response.data))
      setCountryName('');
      setContinent('');
      setRank(1); 
      form.resetFields();
      setFileList([]); 
      setVisible(false)
    } catch (error) {
      console.error('Error adding country:', error);
      message.error(error.response.data || 'Error adding country');
    }
  };
  const uniqueContinents= dataFile["countries"].map(obj=> obj.continent)
  const setOfUniqueContinents= new Set(uniqueContinents)
  const continentOptions = Array.from(setOfUniqueContinents);
  console.log("set",setOfUniqueContinents);
  


  return (
    <div className={style.addForm}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ rank: 1 }}
      >
        <Form.Item
          label="Country Name"
          name="countryName"
          rules={[
            { required: true, message: 'Please input the country name!' },
            { min: 3, max: 20, message: 'Country name should be between 3 and 20 characters' },
          ]}
        >
          <Input
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Enter country name"
          />
        </Form.Item>

        <Form.Item
          label="Continent"
          name="continent"
          rules={[{ required: true, message: 'Please select the continent!' }]}
        >
          <Select
            value={continent}
            onChange={(value) => setContinent(value)}
            placeholder="Select a continent"
          >
            {continentOptions.map(continent => (
              <Select.Option key={continent} value={continent}>
                {continent}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Rank"
          name="rank"
          rules={[{ required: true, message: 'Please input the rank!' }]}
        >
          <InputNumber
            type='number'
            min={1}
            value={rank}
            onChange={(value) => setRank(value)}
            placeholder="Enter rank"
            style={{width:'100%'}}
            
          />
        </Form.Item>

        <Form.Item
          label="Flag Image"
          name="flag"
          rules={[{ required: true, message: 'Please upload the flag image!' }]}
        >
          <Upload
            beforeUpload={() => false} 
            onChange={handleFileChange}
            accept=".jpg,.png"
            fileList={fileList} 
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className={style.btn}>
          <Button type="primary" htmlType="submit">
            Add Country
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCountryForm;
