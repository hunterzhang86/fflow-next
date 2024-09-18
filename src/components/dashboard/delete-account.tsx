"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { SectionColumns } from "@/components/dashboard/section-columns";
import { useDeleteAccountModal } from "@/components/modals/delete-account-modal";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';

export function DeleteAccountSection() {
  const t = useTranslations('DeleteAccountSection');
  const { setShowDeleteAccountModal, DeleteAccountModal } =
    useDeleteAccountModal();

  const userPaidPlan = true;

  return (
    <>
      <DeleteAccountModal />
      <SectionColumns
        title={t('title')}
        description={t('description')}
      >
        <div className="flex flex-col gap-4 rounded-xl border border-red-400 p-4 dark:border-red-900">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium">{t('areYouSure')}</span>

              {userPaidPlan ? (
                <div className="flex items-center gap-1 rounded-md bg-red-600/10 p-1 pr-2 text-xs font-medium text-red-600 dark:bg-red-500/10 dark:text-red-500">
                  <div className="m-0.5 rounded-full bg-red-600 p-[3px]">
                    <Icons.close size={10} className="text-background" />
                  </div>
                  {t('activeSubscription')}
                </div>
              ) : null}
            </div>
            <div className="text-balance text-sm text-muted-foreground">
              {t('deleteWarning', {
                siteName: siteConfig.name,
                subscription: userPaidPlan ? t(' and your subscription') : ''
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              variant="destructive"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              <Icons.trash className="mr-2 size-4" />
              <span>{t('deleteButton')}</span>
            </Button>
          </div>
        </div>
      </SectionColumns>
    </>
  );
}
