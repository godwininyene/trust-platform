<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailTransaction extends Mailable
{
    use Queueable, SerializesModels;

    public $type;
    public $user;
    public $data;

    public function __construct($type, $user, $data)
    {
        $this->type = $type;
        $this->user = $user;
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->type == 'deposit') {
            return new Envelope(
                subject: 'New Deposit',
            );
        }elseif($this->type == 'confirmed_deposit') {
            return new Envelope(
                subject: 'Deposit Confirmed',
            );
        }elseif($this->type == 'unconfirmed_deposit') {
            return new Envelope(
                subject: 'Deposit Not Confirmed',
            );
        }elseif($this->type == 'withdraw') {
            return new Envelope(
                subject: 'New Withdraw',
            );
        }elseif($this->type == 'confirmed_withdraw') {
            return new Envelope(
                subject: 'Withdrawal Successful',
            );
        }elseif($this->type == 'unconfirmed_withdraw') {
            return new Envelope(
                subject: 'Withdrawal Not Confirmed',
            );
        }elseif($this->type == 'transfer') {
            return new Envelope(
                subject: 'Transfer Successful',
            );
        }elseif($this->type == 'commission') {
            return new Envelope(
                subject: 'Referral Commission',
            );
        } else {
            return new Envelope(
                subject: 'Transaction Mail',
            );
        }
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.transaction_email',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
