<?php
/**
 * A Magento 2 module named TheCodingTutor/Shell
 * Copyright (C) 2017  TheCodingTutor
 * 
 * This file included in TheCodingTutor/Shell is licensed under OSL 3.0
 * 
 * http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * Please see LICENSE.txt for the full text of the OSL 3.0 license
 */

namespace TheCodingTutor\Shell\Controller\Shell;

class Console extends \Magento\Framework\App\Action\Action
{
    /**
     * @var PageFactory
     */
    protected $resultPageFactory;

    /**
     * @param Context $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
    ) {
        parent::__construct($context);
        $this->resultJsonFactory = $resultJsonFactory;
    }

    /**
     * Geoip List action
     *
     * @return void
     */
    public function execute()
    {
        $errors = array();      // array to hold validation errors
        $data = array();      // array to pass back data
        $postData = $this->getRequest()->getPostValue();

        if (empty($postData['path']))
            $errors['path'] = 'Name is required.';

        if (empty($postData['command']))
            $errors['command'] = 'command is required.';

        // return a response ===========================================================

        // if there are any errors in our errors array, return a success boolean of false
        if ( ! empty($errors)) {

            // if there are items in our errors array, return those errors
            $data['success'] = false;
            $data['errors']  = $errors;
        } else {
            $data['success'] = true;
            $command = "php ".$postData['path']."/".$postData['command'];
            $data['message'] = "<pre>".shell_exec($command)."</pre>";
        }
        
        return $this->resultJsonFactory->create()->setData($data);
    }
}