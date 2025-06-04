import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import CreatedKnowledge from "@/knowledgeBase/createdKnowledge";
import React from "react";
import {cn} from "@/lib/utils";
import {Card} from "antd";

export default () => {
  return (
    <Card className={cn('mb-1')}>
      <div className={cn('flex w-full items-center')}>
        <div className={cn('flex-1')}>
          <QueryFilter>
            <ProFormText name="name" label="名称"/>
            <ProFormDatePicker name="birth" label="创建时间"/>
          </QueryFilter>
        </div>
        <div>
          <CreatedKnowledge/>
        </div>
      </div>
    </Card>
  );
};