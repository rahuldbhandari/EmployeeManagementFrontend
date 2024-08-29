export enum ActionTypeEnum{
  PCREATE = 1,
  PUPDATE = 2,
  PFORWARD = 3,
  PAPPROVE = 4,
  PREJECT = 5,
  UOGENERATE = 6,
  BANKENTRY = 7,
}


export enum IFSCSearchByEnum{
    BankName = "bankname",
    IFSC = "ifsc",
    Office = "office",
}

export enum FavListCategoryEnum{
  Scheme = 1,
  Agency = 2,
  Beneficiary = 3,
}
export enum SanctionModeEnum{
  PPA = 1,
  Cheque = 2,
}

export enum SanctionCategoryEnum{
  Scheme = 1,
  Component = 2,
}

export enum SelectLocality{
  Urban = 'U',
  Rural = 'R'
}

export enum CreatePermission{
  new = "NEW",
  existing = "OLD"
}

export enum LevelEnum{
  FDGRT = "FDGRT",
  DEPARTMENT = "DEPARTMENT",
  OFFICE = "OFFICE",
}

export enum RoleEnum
{
    OPERATOR="OPERATOR",
    APPROVER="APPROVER"
}

export enum ActionsTypeEnum{
  PCREATE = "PCREATE",
  PUPDATE = "PUPDATE",
  PAPPROVE = "PAPPROVE",
  PFORWARD = "PFORWARD",
  PREJECT = "PREJECT",
  UOGENERATE = "UOGENERATE",
}

export enum ActivityEnum{
  INITIATE = 1,
  UPDATE = 2,
  FORWARD = 3,
  APPROVE = 4,
  REVERT = 5,
  REJECT = 6,
  UOGENERATE = 7,
  BANK_ACC_ENTRY = 8,
  BANK_ACC_FORWARD = 9,
  BANK_ACC_APPROVE = 10,
  BANK_ACC_SENT_FOR_VALIDATION = 11,
  BANK_ACC_VALIDATED = 12,
  BANK_ACC_ACTIVATE = 13,
  BANK_ACC_DEACTIVATE = 14,
}


