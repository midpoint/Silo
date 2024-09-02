import {
  Dialog,
  Button,
  TooltipLite,
  Select,
  InputNumber,
  Slider,
} from 'tdesign-react';
import { useImageModelOptions } from '../../../utils/options/image-options';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import Tooltip from '../../MobileCompatible/Tooltip';

const ConfigOptions = forwardRef(({}, ref) => {
  const [modelId, setModelId] = useState();
  const [visible, setVisible] = useState(false);
  const {
    options: currentConfig,
    setOption,
    configItems,
    applyToAll,
  } = useImageModelOptions(modelId);
  useImperativeHandle(ref, () => ({
    open: modelId => {
      setModelId(modelId);
      setVisible(true);
    },
  }));
  const onHide = () => setVisible(false);

  const renderInputComponent = option => {
    switch (option.type) {
      case 'input_number':
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{option.label}</span>
                <Tooltip content={option.tooltip}>
                  <i
                    className="i-ri-question-line ml-2 cursor-pointer"
                    style={{ marginLeft: '5px' }}
                  ></i>
                </Tooltip>
              </div>
              <InputNumber
                value={currentConfig[option.prop]}
                onChange={value => setOption(option.prop, value)}
                min={option.min}
                max={option.max}
                step={option.step}
              />
            </div>
            <Slider
              value={currentConfig[option.prop]}
              onChange={value => setOption(option.prop, value)}
              min={option.min}
              max={option.max}
              step={option.step}
              style={{ marginTop: '10px' }}
            />
          </div>
        );
      case 'rect_select':
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{option.label}</span>
                <Tooltip content={option.tooltip}>
                  <i
                    className="i-ri-question-line ml-2 cursor-pointer"
                    style={{ marginLeft: '5px' }}
                  ></i>
                </Tooltip>
              </div>
              <Select
                value={currentConfig[option.prop]}
                onChange={value => setOption(option.prop, value)}
                style={{ width: '150px' }}
              >
                {option.options.map(size => (
                  <Select.Option key={size.value} value={size.value}>
                    {size.value}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}
            >
              {option.options.map(size => (
                <div
                  key={size.value}
                  style={{
                    width: '50px',
                    height: '50px',
                    margin: '5px',
                    border:
                      currentConfig[option.prop] === size.value
                        ? '2px solid var(--td-brand-color)'
                        : '1px solid var(--td-component-border)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'var(--td-bg-color-container)',
                  }}
                  onClick={() => setOption(option.prop, size.value)}
                >
                  <div
                    style={{
                      width: `${(size.x / Math.max(size.x, size.y)) * 40}px`,
                      height: `${(size.y / Math.max(size.x, size.y)) * 40}px`,
                      backgroundColor: 'var(--td-component-stroke)',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderInputWithTooltip = option => (
    <div
      key={option.prop}
      className="input-group"
      style={{ marginBottom: '20px' }}
    >
      {renderInputComponent(option)}
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onClose={onHide}
      onEscKeydown={onHide}
      header={`配置 ${modelId} `}
      footer={
        <div className="flex justify-end">
          <Tooltip content="不同模型支持的参数或有效区间可能存在不同，将尽可能将当前配置应用到其他的模型">
            <Button theme="default" variant="text" onClick={applyToAll}>
              应用到全部
            </Button>
          </Tooltip>
          <Button
            className="ml-2"
            theme="primary"
            variant="outline"
            onClick={onHide}
          >
            确定
          </Button>
        </div>
      }
      style={{ padding: '16px' }}
    >
      <div className="px-2 pt-2">
        {visible && configItems.map(renderInputWithTooltip)}
      </div>
    </Dialog>
  );
});
export default ConfigOptions;